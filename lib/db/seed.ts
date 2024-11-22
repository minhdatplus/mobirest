import { db } from "./index";
import type { 
  CreatePromptPattern, 
  CreatePromptSection,
  CreatePromptGroup,
  CreatePrompt,
  CreatePromptContent 
} from "./schema";

export async function seedDatabase() {
  try {
    // Clear existing data
    await db.delete();
    await db.open();

    // Seed patterns
    const costarPattern = {
      name: "CoSTAR",
      description: "Context, Objective, Style, Tone, Audience, Response format",
      version: "1.0.0"
    } as const;

    const patternId = await db.patterns.add(costarPattern);

    // Seed sections
    const costarSections: CreatePromptSection[] = [
      {
        patternId,
        name: "Context",
        key: "costar.context",
        order: 0,
        isRequired: true,
        description: "Background information and context"
      },
      {
        patternId,
        name: "Objective",
        key: "costar.objective",
        order: 1,
        isRequired: true,
        description: "What you want to achieve"
      },
      {
        patternId,
        name: "Style",
        key: "costar.style",
        order: 2,
        isRequired: true,
        description: "Writing style and format"
      },
      {
        patternId,
        name: "Tone",
        key: "costar.tone",
        order: 3,
        isRequired: true,
        description: "Tone of voice"
      },
      {
        patternId,
        name: "Audience",
        key: "costar.audience",
        order: 4,
        isRequired: true,
        description: "Target audience"
      },
      {
        patternId,
        name: "Response",
        key: "costar.response",
        order: 5,
        isRequired: true,
        description: "Expected response format"
      }
    ];

    const sectionIds = await Promise.all(
      costarSections.map(section => db.sections.add(section))
    );

    // Seed sample groups
    const marketingGroup = {
      name: "Marketing",
      description: "Marketing related prompts",
      level: 0,
      order: 0,
      parentId: null
    } as const;

    const supportGroup = {
      name: "Customer Support",
      description: "Support related prompts",
      level: 0,
      order: 1,
      parentId: null
    } as const;

    const [marketingId, supportId] = await Promise.all([
      db.groups.add(marketingGroup),
      db.groups.add(supportGroup)
    ]);

    // Seed sample prompts
    const welcomePrompt = {
      name: "Welcome Message",
      description: "Generate welcome message for new customers",
      groupId: marketingId,
      patternId,
      version: "1.0.0",
      isArchived: false
    } as const;

    const promptId = await db.prompts.add(welcomePrompt);

    const contents = [
      "Provide relevant background information",
      "Specify the goal of this message",
      "Define the writing style",
      "Specify the tone of voice",
      "Describe the target audience",
      "Outline the expected response format"
    ];

    // Seed sample contents
    const sampleContents = sectionIds.map((sectionId: number, index): CreatePromptContent => ({
      promptId,
      sectionId,
      content: contents[index],
      order: index,
      isEnabled: true,
      variables: []
    }));

    await db.contents.bulkAdd(sampleContents);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}