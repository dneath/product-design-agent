/**
 * Product Design Plugin for OpenCode
 * 
 * Enhances UX/UI/Product design workflows with:
 * - Context-aware behavior based on design intent detection
 * - Proactive skill suggestions for design tasks
 * - Domain-specific guidance injection
 * - Strict validation gates (5 gates)
 * - Variance tracking (prevents repetition)
 * - DesignPrompts.dev CSV integration
 * - Enhanced compaction context preservation
 */

import fs from 'fs';
import path from 'path';
import { varianceHistoryPath, referencePath } from './path-resolver.mjs';
import { validateDesign, formatValidationReport } from './design-validator.mjs';

/**
 * @param {Object} context - Plugin context from OpenCode
 * @param {string} context.directory - Current workspace directory
 * @param {Object} context.client - OpenCode client for API calls
 * @returns {Promise<Object>} Plugin hooks
 */
export default async function ProductDesignPlugin({ directory, client }) {
  
  // ============================================================================
  // Variance Tracking System
  // ============================================================================
  
  const varianceHistory = {
    maxEntries: 10,
    history: [], // { type, vibeArchetype, layoutArchetype, timestamp, signature }
    filePath: varianceHistoryPath(directory),
    
    /**
     * Load history from disk
     */
    async load() {
      try {
        if (fs.existsSync(this.filePath)) {
          const data = fs.readFileSync(this.filePath, 'utf8');
          this.history = JSON.parse(data);
        }
      } catch (error) {
        console.warn('Failed to load variance history:', error.message);
        this.history = [];
      }
    },
    
    /**
     * Save history to disk
     */
    async save() {
      try {
        const dir = path.dirname(this.filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(this.filePath, JSON.stringify(this.history, null, 2));
      } catch (error) {
        console.warn('Failed to save variance history:', error.message);
      }
    },
    
    /**
     * Add entry to history
     */
    async add(entry) {
      this.history.unshift({
        ...entry,
        timestamp: new Date().toISOString()
      });
      
      if (this.history.length > this.maxEntries) {
        this.history.pop();
      }
      
      await this.save();
    },
    
    /**
     * Check for repetition
     */
    checkRepetition(type) {
      const recent = this.history.filter(h => h.type === type).slice(0, 2);
      
      if (recent.length >= 2) {
        const [latest, previous] = recent;
        if (latest.vibeArchetype === previous.vibeArchetype &&
            latest.layoutArchetype === previous.layoutArchetype) {
          return {
            blocked: true,
            reason: `Repetition detected: ${latest.vibeArchetype} + ${latest.layoutArchetype} used in last 2 ${type} outputs`,
            suggest: this.suggestAlternate(latest)
          };
        }
      }
      
      return { blocked: false };
    },
    
    /**
     * Suggest alternate vibe+layout combo
     */
    suggestAlternate(current) {
      const vibes = [
        'Ethereal Glass',
        'Editorial Luxury',
        'Soft Structuralism',
        'Dark Technical',
        'Warm Minimalism',
        'Industrial Monochrome'
      ];
      
      const layouts = [
        'Asymmetrical Bento',
        'Z-Axis Cascade',
        'Editorial Split',
        'Terminal Grid',
        'Magazine Flow',
        'Dashboard Radial'
      ];
      
      const availableVibes = vibes.filter(v => v !== current.vibeArchetype);
      const availableLayouts = layouts.filter(l => l !== current.layoutArchetype);
      
      return {
        vibe: availableVibes[Math.floor(Math.random() * availableVibes.length)],
        layout: availableLayouts[Math.floor(Math.random() * availableLayouts.length)]
      };
    }
  };
  
  // Load variance history on plugin init
  await varianceHistory.load();
  
  // ============================================================================
  // Design Intent Detection
  // ============================================================================
  
  /**
   * Comprehensive trigger terms organized by domain
   */
  const DESIGN_TRIGGERS = {
    // User Research (20 terms)
    research: [
      'user research', 'research plan', 'interview guide', 'usability test',
      'survey design', 'research questions', 'participant', 'user needs',
      'thematic analysis', 'affinity mapping', 'persona', 'jobs to be done',
      'jtbd', 'user interview', 'research study', 'diary study', 'card sorting',
      'triangulation', 'synthesize research', 'research synthesis'
    ],
    
    // Design System (25 terms)
    designSystem: [
      'design system', 'design token', 'token', 'component library',
      'pattern library', 'style guide', 'component documentation',
      'variant', 'semantic token', 'elevation', 'surface', 'layering',
      'token coverage', 'hardcoded value', 'component completeness',
      'migration path', 'breaking change', 'design system audit',
      'atomic design', 'component variant', 'component state',
      'design system documentation', 'token architecture', 'spacing scale',
      'typography scale'
    ],
    
    // Visual Design (15 terms)
    visualDesign: [
      'visual design', 'visual hierarchy', 'typography', 'color palette',
      'spacing', 'layout', 'grid system', 'subtle layering', 'depth strategy',
      'border progression', 'craft check', 'swap test', 'squint test',
      'signature test', 'token test'
    ],
    
    // UX/UI (20 terms)
    uxui: [
      'ux', 'ui', 'user experience', 'user interface', 'interaction design',
      'information architecture', 'navigation', 'onboarding', 'empty state',
      'error state', 'loading state', 'success state', 'touch target',
      'hit area', 'gesture', 'microinteraction', 'animation timing',
      'easing', 'motion continuity', 'state transition'
    ],
    
    // Accessibility (15 terms)
    accessibility: [
      'accessibility', 'a11y', 'wcag', 'contrast ratio', 'screen reader',
      'keyboard navigation', 'focus indicator', 'aria', 'semantic html',
      'alt text', 'accessible name', 'touch target size', 'perceivable',
      'operable', 'understandable'
    ],
    
    // UX Copy (10 terms)
    uxCopy: [
      'ux copy', 'microcopy', 'cta', 'call to action', 'error message',
      'empty state copy', 'confirmation dialog', 'tooltip', 'placeholder',
      'button text'
    ],
    
    // Interaction Patterns (10 terms)
    interaction: [
      'hover state', 'active state', 'disabled state', 'focus state',
      'pressed state', 'loading feedback', 'error feedback', 'success feedback',
      'haptic feedback', 'ripple effect'
    ],
    
    // Product Strategy (15 terms)
    productStrategy: [
      'product strategy', 'brainstorm', 'ideation', 'problem exploration',
      'solution ideation', 'assumption testing', 'opportunity tree',
      'how might we', 'hmw', 'ooda loop', 'first principles', 'scamper',
      'opportunity sizing', 'impact effort matrix', 'product problem'
    ],
    
    // Workflows (15 terms)
    workflows: [
      'design critique', 'critique', 'design review', 'handoff',
      'design handoff', 'developer handoff', 'implementation spec',
      'design spec', 'design audit', 'heuristic evaluation', 'design qa',
      'visual qa', 'design review', 'peer review', 'design feedback'
    ],
    
    // Interface Types (12 terms)
    interfaceTypes: [
      'dashboard', 'admin panel', 'saas app', 'settings page',
      'data interface', 'product workflow', 'form design', 'table design',
      'chart design', 'data visualization', 'modal design', 'drawer design'
    ],
    
    // General Design (10 terms)
    general: [
      'design', 'mockup', 'prototype', 'wireframe', 'figma',
      'design direction', 'design intent', 'design exploration',
      'design iteration', 'design refinement'
    ],
    
    // Frontend (8 terms)
    frontend: [
      'component', 'react component', 'vue component', 'svelte component',
      'web component', 'component architecture', 'component composition',
      'component api'
    ],
    
    // QA (5 terms)
    qa: [
      'qa', 'quality assurance', 'design qa', 'visual qa', 'regression testing'
    ],

    // AI Mentor (8 terms)
    mentor: [
      'mentor', 'idea to concept', 'product concept', 'is this a good idea',
      'what should i build', 'concept brief', 'riskiest assumption', 'lean canvas'
    ],

    // UX Flows (10 terms)
    uxFlows: [
      'user flow', 'user flows', 'user journey', 'journey map', 'task flow',
      'sitemap', 'product structure', 'flow diagram', 'happy path', 'flowchart'
    ],

    // UX Audit (6 terms)
    uxAudit: [
      'ux audit', 'usability review', 'usability audit', 'nielsen',
      'usability heuristics', 'heuristic walkthrough'
    ],

    // Design Converter (7 terms)
    designConverter: [
      'convert this', 'turn this into ui', 'sketch to ui', 'screenshot to ui',
      'wireframe to ui', 'design converter', 'image to ui'
    ],

    // Figma Export (6 terms)
    figmaExport: [
      'export to figma', 'push to figma', 'build in figma', 'create in figma',
      'figma export', 'design to figma'
    ],

    // Portfolio (6 terms)
    portfolio: [
      'case study', 'case studies', 'portfolio', 'design portfolio',
      'write up this project', 'project writeup'
    ],

    // Prototype Variants (8 terms)
    prototypeVariants: [
      'prototype variants', 'design variants', 'design options', 'show me options',
      'multiple versions', 'two or three versions', 'variant a', 'compare directions'
    ],

    // Diagrams (10 terms)
    diagrams: [
      'diagram', 'sequence diagram', 'state machine', 'state diagram',
      'architecture diagram', 'entity relationship', 'erd', 'mermaid',
      'figjam', 'visualize the flow'
    ],

    // Annotations & UX Write-ups (9 terms)
    annotations: [
      'annotate', 'annotation', 'annotations', 'redline', 'redlines',
      'ux rationale', 'design rationale', 'decision record', 'design write-up'
    ]
  };

  /**
   * Flatten all triggers into a single array for matching
   */
  const ALL_TRIGGERS = Object.values(DESIGN_TRIGGERS).flat();

  /**
   * Detect design intent from user message
   * @param {string} message - User message text
   * @returns {Object|null} Intent object with mode and triggers, or null if no match
   */
  function detectDesignIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    // Count matches per domain
    const domainMatches = {};
    let totalMatches = 0;
    
    for (const [domain, terms] of Object.entries(DESIGN_TRIGGERS)) {
      const matches = terms.filter(term => lowerMessage.includes(term));
      if (matches.length > 0) {
        domainMatches[domain] = matches;
        totalMatches += matches.length;
      }
    }
    
    if (totalMatches === 0) {
      return null;
    }
    
    // Determine primary mode (domain with most matches)
    const primaryDomain = Object.keys(domainMatches)
      .sort((a, b) => domainMatches[b].length - domainMatches[a].length)[0];
    
    return {
      mode: primaryDomain,
      triggers: domainMatches,
      matchCount: totalMatches
    };
  }

  /**
   * Suggest relevant skills based on detected intent
   * @param {Object} intent - Intent object from detectDesignIntent
   * @returns {string[]} Array of skill names to suggest
   */
  function suggestSkills(intent) {
    const suggestions = [];
    
    // Map domains to skills
    const skillMap = {
      research: ['user-research', 'synthesize-research'],
      designSystem: ['design-system'],
      visualDesign: ['interface-design', 'design-critique'],
      uxui: ['interface-design', 'ui-ux-pro-max'],
      accessibility: ['accessibility-audit'],
      uxCopy: ['ux-copy'],
      productStrategy: ['product-brainstorming'],
      workflows: ['design-critique', 'design-handoff'],
      interfaceTypes: ['interface-design', 'ui-ux-pro-max'],
      uxAudit: ['accessibility-audit', 'design-critique'],
      figmaExport: ['figma-generate-design'],
      prototypeVariants: ['interface-design', 'ui-ux-pro-max'],
      diagrams: ['figma-generate-diagram'],
      annotations: ['design-handoff', 'design-critique']
    };
    
    // Add skills for all matched domains
    for (const domain of Object.keys(intent.triggers)) {
      if (skillMap[domain]) {
        suggestions.push(...skillMap[domain]);
      }
    }
    
    // Remove duplicates and return top 3
    return [...new Set(suggestions)].slice(0, 3);
  }

  /**
   * Generate context-aware guidance based on intent
   * @param {Object} intent - Intent object from detectDesignIntent
   * @returns {string} Guidance text to inject
   */
  function generateGuidance(intent) {
    const guidanceMap = {
      research: `
**User Research Focus**:
- Frame with specific research questions before gathering data
- Evidence > assumptions: trace findings to specific sources (quotes, data, participant counts)
- Behavioral observation > stated preferences: what users do vs. what they say
- Mark confidence levels (High/Medium/Low) based on evidence strength
- Report contradictions honestly - they often reveal meaningful segments`,

      designSystem: `
**Design System Standards**:
- Token-based architecture: use semantic tokens, not hardcoded values
- Document variants, states, and accessibility for every component
- Consistency > creativity: the system exists so teams don't reinvent
- Breaking changes need migration paths
- If not documented, it doesn't exist`,

      visualDesign: `
**Visual Design Craft**:
- Subtle layering: whisper-quiet elevation changes, not dramatic jumps
- Border progression: standard → softer → emphasis → maximum emphasis
- Text hierarchy: primary (high contrast) → secondary → tertiary → muted
- Depth strategy: pick one (borders-only, subtle shadows, layered shadows, or surface shifts)
- Every choice must be a choice: explain why, not "it's common"`,

      accessibility: `
**Accessibility Requirements**:
- WCAG 2.1 AA: 4.5:1 contrast for text, 3:1 for UI components
- Semantic HTML: use proper elements (button, nav, header), not styled divs
- Keyboard navigation: all interactive elements must be keyboard accessible
- Touch targets: minimum 44×44pt (iOS) or 48×48dp (Android)
- Calculate contrast precisely - don't estimate`,

      uxCopy: `
**UX Copy Standards**:
- Clear, concise, consistent, useful, human
- Error structure: What happened + Why + How to fix
- Empty state structure: What this is + Why it's empty + How to start
- Adapt tone to user's emotional state (success = celebratory, error = empathetic)
- Avoid placeholder-only labels - they disappear when typing`,

      productStrategy: `
**Product Strategy Approach**:
- Frame the problem before exploring solutions
- Generate 5-7+ distinct approaches before evaluating
- HMW questions: reframe problems into opportunities
- Test assumptions explicitly: user, problem, solution, business, feasibility
- Avoid feature parity trap: copying competitors without understanding user needs`,

      workflows: `
**Design Workflow Standards**:
- Stage-appropriate feedback: exploration gets different critique than final polish
- Critique structure: First impression → Usability → Hierarchy → Consistency → Accessibility
- Handoff completeness: layout, tokens, states, responsive behavior, edge cases, animation, a11y
- Priority ranking: focus on top 3-5 most impactful changes`,

      interfaceTypes: `
**Interface Design Principles**:
- Intent-first: answer "who/what/feel" before any code
- Avoid generic defaults: "clean and modern" is meaningless
- Self-critique mandate: catch defaults before showing to user
- State completeness: default, hover, active, focus, disabled, loading, error, empty
- Systemic application: every token must reinforce the design intent`,

      mentor: `
**AI Mentor Mode**:
- Mentor by asking, not answering — surface assumptions first
- Reframe the idea as How-Might-We questions; problem before solution
- Write the Job-To-Be-Done; identify and test the riskiest assumption
- Diverge to 5+ distinct concepts, then converge by impact × feasibility`,

      uxFlows: `
**UX Flows Mode**:
- Define the happy path first, then error and edge branches
- Choose the artifact: task flow, user flow, or journey map
- IA depth ≤ 3; label sections in the user's domain language
- For journeys, map stages → actions → thoughts → emotions → opportunities`,

      uxAudit: `
**UX Audit Mode**:
- Evaluate against Nielsen's 10 heuristics + WCAG 2.1 AA
- Measure contrast — never estimate
- Severity = frequency × severity (Critical/Major/Minor)
- Every finding needs a location, the heuristic/criterion, and a concrete fix`,

      designConverter: `
**Design Converter Mode**:
- Reverse-engineering does NOT skip the gates
- Infer intent + domain; don't copy the screenshot's arbitrary palette
- Map observed values to tokens (don't hardcode); complete all 8 states
- List every assumption you made`,

      figmaExport: `
**Figma Export Mode**:
- Load the figma-generate-design / figma-generate-library skill FIRST
- Export via variables/styles, not hardcoded values
- Preserve the project's resolved styling (existing repo / source Figma / user-specified; fallback monochrome + 4px + Inter & Fragment Mono) — no fixed brand
- Re-run validation tests on the exported result`,

      portfolio: `
**Portfolio Builder Mode**:
- Lead with the problem and the decisions, not screenshots
- Use CRP-PDSI: Context, Role, Problem, Process, Decisions, Solution, Impact
- Honest role attribution; never invent metrics
- Pair every number with the mechanism behind it`,

      prototypeVariants: `
**Prototype Variants Mode**:
- New UI is never a single take: build 2-3 genuinely distinct variants (A/B/C)
- Distinct = own Vibe+Layout pairing + own signature element, not a palette swap
- Build real interactive React in one app with a tab group to switch A/B/C; real domain content; states reachable
- Verify it renders and behaves in a real browser (delegate to a sub-agent) before presenting
- Present a comparison table + recommendation, then STOP — the user picks the winner`,

      diagrams: `
**Diagram Mode**:
- One diagram answers one question; pick the type from the question (flowchart/sequence/state/journey/ER/architecture)
- Mermaid source is the artifact — save the .mmd; quote labels, label every decision branch
- No dead ends without recovery; node labels pass the token test
- FigJam export: load figma-generate-diagram skill FIRST, then generate_diagram`,

      annotations: `
**UX Annotations & Write-ups Mode**:
- Annotate the non-obvious with numbered, typed callouts: INT/STA/MOT/CON/A11Y/LOG
- Behavior under condition, never appearance; numbering is append-only
- Interactive elements need INT + STA + A11Y before handoff; redlines use tokens
- Rationale = decision records: decision → evidence → alternatives → trade-off → success signal`
    };
    
    return guidanceMap[intent.mode] || '';
  }

  // ============================================================================
  // Validation Functions
  // ============================================================================
  
  /**
   * Detect interface type from text
   */
  function detectInterfaceType(text) {
    const types = {
      dashboard: /dashboard/i,
      adminPanel: /admin panel/i,
      form: /form design/i,
      table: /table|data grid/i,
      card: /card grid|card layout/i
    };
    
    for (const [type, pattern] of Object.entries(types)) {
      if (pattern.test(text)) return type;
    }
    return null;
  }
  
  /**
   * Validate color hygiene (style-agnostic).
   * Styling is resolved from context (existing repo / Figma / user / fallback) — this does
   * NOT mandate any font, color, or brand. It only flags pure #000/#fff, which are never
   * craft-correct: neutrals should be tinted a hair toward one hue (OKLCH).
   */
  function validateColorHygiene(text) {
    return /#(?:000000|000|ffffff|fff)\b/i.test(text);
  }
  
  /**
   * Detect Figma URL
   */
  function detectFigmaURL(message) {
    const pattern = /https:\/\/www\.figma\.com\/(design|file)\/([a-zA-Z0-9]+)/;
    const match = message.match(pattern);
    
    if (match) {
      return {
        detected: true,
        fileKey: match[2],
        mode: 'collaborate'
      };
    }
    
    return { detected: false };
  }

  // ============================================================================
  // DesignPrompts.dev CSV Integration
  // ============================================================================
  
  /**
   * Load DesignPrompts.dev reference data
   */
  async function loadDesignPromptsReference(style) {
    try {
      const stylesPath = referencePath(directory, 'designprompts-styles.json');
      
      if (fs.existsSync(stylesPath)) {
        const data = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));
        const match = data.find(s => 
          s.style.toLowerCase().includes(style) || 
          s.keywords.some(k => k.toLowerCase().includes(style))
        );
        
        if (match) {
          return {
            style: match.style,
            palette: match.primaryColors,
            keywords: match.keywords.join(', '),
            bestFor: match.bestFor,
            implementationChecklist: match.implementationChecklist
          };
        }
      }
    } catch (error) {
      console.warn('Failed to load DesignPrompts reference:', error.message);
    }
    
    return null;
  }

  // ============================================================================
  // Plugin Hooks
  // ============================================================================

  return {
    /**
     * Hook: Append context-aware guidance to user prompts
     */
    'tui.prompt.append': async (input, output) => {
      const userMessage = input.prompt || '';
      
      // Detect design intent
      const intent = detectDesignIntent(userMessage);
      if (!intent) return;
      
      // Generate guidance
      const guidance = generateGuidance(intent);
      if (guidance) {
        output.append.push(`\n${guidance}\n`);
      }
      
      // Suggest relevant skills
      const skills = suggestSkills(intent);
      if (skills.length > 0) {
        const skillList = skills.map(s => `\`${s}\``).join(', ');
        output.append.push(`\n💡 Consider invoking: ${skillList}\n`);
      }
      
      // Check for Figma URL
      const figmaDetection = detectFigmaURL(userMessage);
      if (figmaDetection.detected) {
        output.append.push(`\n🎨 **Figma URL Detected**: Collaboration mode activated. File key: ${figmaDetection.fileKey}\n`);
      }
      
      // Check for style keywords (DesignPrompts.dev integration)
      const styleMatch = userMessage.match(/(?:minimalist|brutalist|glassmorphism|neumorphism|industrial|editorial|luxury|dark mode|oled|claymorphism|aurora|retro|flat|skeuomorphism|liquid glass|motion-driven)/i);
      if (styleMatch) {
        const style = styleMatch[0].toLowerCase();
        const referenceData = await loadDesignPromptsReference(style);
        
        if (referenceData) {
          output.append.push(`
📚 **DesignPrompts.dev Reference Loaded**: ${referenceData.style}

**Suggested Palette**: ${referenceData.palette}
**Keywords**: ${referenceData.keywords}
**Best For**: ${referenceData.bestFor}

⚠️ **IMPORTANT**: Apply these as starting point, then:
1. Still complete Intent Declaration (Who/What/Feel)
2. Still complete Domain Exploration (adapt colors to product's world)
3. Still run Validation Tests
4. Style reference does NOT bypass gates
`);
        }
      }
    },

    /**
     * Hook: Validate design before showing to user (STRICT ENFORCEMENT)
     */
    'tui.before-response': async (input, output) => {
      const responseText = output.text || '';
      
      // Check 1: Detect if this is design output
      const isDesignOutput = /```(jsx|tsx|css|html)|design|mockup|prototype|interface/i.test(responseText);
      if (!isDesignOutput) return;

      const results = await validateDesign(responseText, directory, {
        userPrompt: input.prompt || '',
      });
      if (!results.passed) {
        output.block = true;
        output.blockReason = formatValidationReport(results);
        return;
      }
      
      // Check 6: Variance check (for interface types)
      const interfaceType = detectInterfaceType(responseText);
      if (interfaceType) {
        const variance = varianceHistory.checkRepetition(interfaceType);
        if (variance.blocked) {
          output.block = true;
          output.blockReason = `❌ GATE 4 FAILED: ${variance.reason}

**Suggested alternate combination**:
- Vibe: ${variance.suggest.vibe}
- Layout: ${variance.suggest.layout}

Please select a different vibe + layout archetype and try again.`;
          return;
        }
        
        // Extract vibe+layout from response (if documented)
        const vibeMatch = responseText.match(/vibe(?:\s+archetype)?:\s*([^\n]+)/i);
        const layoutMatch = responseText.match(/layout(?:\s+archetype)?:\s*([^\n]+)/i);
        
        if (vibeMatch && layoutMatch) {
          // Add to variance history
          await varianceHistory.add({
            type: interfaceType,
            vibeArchetype: vibeMatch[1].trim(),
            layoutArchetype: layoutMatch[1].trim(),
            signature: responseText.match(/signature:\s*([^\n]+)/i)?.[1]?.trim() || 'unknown'
          });
        }
      }
      
      // Check 7: Color hygiene (style-agnostic — no brand mandate)
      if (validateColorHygiene(responseText)) {
        output.append.push(`\n⚠️ **Color hygiene**: Pure #000/#fff detected. Tint every neutral a hair toward one hue (OKLCH, chroma 0.005–0.01) so the grayscale reads as intentional.

Styling is context-driven — adopt the repo/Figma/user tokens. When nothing specifies a system, fall back to monochrome OKLCH + a 4px spacing scale + Inter (UI/text) & Fragment Mono (mono).\n`);
      }
    },

    /**
     * Hook: Preserve design context during compaction
     */
    'experimental.session.compacting': async (input, output) => {
      const { messages } = input;
      
      // Preserve key design artifacts
      const preservePatterns = [
        // Evidence & Research
        /confidence level/i,
        /\d+ participants?/i,
        /quote:/i,
        /evidence:/i,
        
        // Design System
        /design token/i,
        /semantic token/i,
        /component variant/i,
        /accessibility note/i,
        
        // Craft & Quality
        /craft check/i,
        /swap test/i,
        /squint test/i,
        /signature test/i,
        /token test/i,
        
        // Workflows
        /research question/i,
        /design intent/i,
        /domain exploration/i,
        /color world/i,
        
        // Variance
        /vibe archetype/i,
        /layout archetype/i,
        
        // Decisions & Trade-offs
        /decision:/i,
        /rationale:/i,
        /trade-off/i,
        /assumption:/i
      ];
      
      // Extract and preserve matching content
      const preserved = [];
      for (const msg of messages) {
        if (msg.role !== 'assistant') continue;
        
        const text = msg.content || '';
        for (const pattern of preservePatterns) {
          const matches = text.match(new RegExp(`.{0,50}${pattern.source}.{0,50}`, 'gi'));
          if (matches) {
            preserved.push(...matches.slice(0, 2)); // Max 2 per pattern
          }
        }
      }
      
      // Add to compaction context
      if (preserved.length > 0) {
        output.context.push(`\nDesign Context (preserved):\n${preserved.slice(0, 10).join('\n')}\n`);
      }
      
      // Preserve variance history summary
      if (varianceHistory.history.length > 0) {
        const recent = varianceHistory.history.slice(0, 3).map(h => 
          `${h.type}: ${h.vibeArchetype} + ${h.layoutArchetype}`
        ).join(', ');
        output.context.push(`\nRecent Variance History: ${recent}\n`);
      }
    }
  };
}
