const core = require("@actions/core");
const github = require("@actions/github");
const asana = require("asana");

async function asanaCreateTask(
  asanaSecret,
  workspaceId,
  projectId,
  sectionId,
  taskName,
  taskDueOn,
  taskDescription
) {
  try {
    const client = asana.Client.create({
      defaultHeaders: {
        "asana-enable": "new_project_templates,new_user_task_lists",
      },
      logAsanaChangeWarnings: false,
    }).useAccessToken(asanaSecret);

    await client.tasks.createTask({
      approval_status: "pending",
      completed: false,
      name: taskName,
      notes: taskDescription,
      projects: [projectId],
      memberships: [{ project: projectId, section: sectionId }],
      workspace: workspaceId,
      due_on: taskDueOn,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

try {
  const ASANA_SECRET = core.getInput("asana-secret").toString(),
    ASANA_WORKSPACE_ID = core.getInput("asana-workspace-id").toString(),
    ASANA_PROJECT_ID = core.getInput("asana-project-id").toString(),
    ASANA_SECTION_ID = core.getInput("asana-section-id").toString(),
    ASANA_TASK_NAME = core.getInput("asana-task-name").toString(),
    ASANA_TASK_DUE_ON = core.getInput("asana-task-due-on").toString(),
    PULL_REQUEST = github.context.payload.pull_request;

  if (!ASANA_SECRET) {
    throw { message: "Asana secret Not Found!" };
  }
  taskDescription = `Pull request: ${PULL_REQUEST.html_url}`;
  asanaCreateTask(
    ASANA_SECRET,
    ASANA_WORKSPACE_ID,
    ASANA_PROJECT_ID,
    ASANA_SECTION_ID,
    ASANA_TASK_NAME,
    ASANA_TASK_DUE_ON,
    taskDescription
  );
} catch (error) {
  core.error(error.message);
}
