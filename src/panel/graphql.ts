import {gql} from "@apollo/client";


// exclude flowruns
export const GET_AGENTS = gql`
    query {
        get_agents {
            id
            name
            labels
            address
        }
    }
`

// exclude flowruns
export const GET_FLOWS = gql`
    query($input: GetFlowsInput!) {
        get_flows(input: $input) {
            id
            name
            full_name
            labels
            tasks {
                id
                name
                full_name
                labels
                flow_id
                output {
                    id
                    task_id
                    flow_id
                }
                docstring
                context
            }
            edges {
                channel_id
                task_id
            }
            docstring
            serialized_flow
            context
        }
    }
`

// exclude taskruns
export const GET_FLOWRUNS = gql`
    query($input: GetFlowRunsInput!) {
        get_flowruns(input: $input) {
            id
            agent_id
            flow_id
            name
            labels
            context
            state {
                state_type
                result
                message
            }
            start_time
            end_time
            last_heartbeat
        }
    }
`

export const GET_TASKRUNS_STATE_ONLY = gql`
    query($input: GetTaskRunsInput!) {
        get_taskruns(input: $input) {
            id
            state {
                state_type
            }
        }
    }
`

export const GET_TASKRUNS = gql`
    query($input: GetTaskRunsInput!) {
        get_taskruns(input: $input) {
            id
            flowrun_id
            agent_id
            task_id
            context
            start_time
            end_time
            last_heartbeat
            state {
                state_type
                result
                message
            }
        }
    }
`
export const GET_RUNLOGS = gql`
    query($input: GetRunLogsInput!) {
        get_runlogs(input: $input) {
            id
            level
            time
            message
            task_id
            flow_id
            taskrun_id
            flowrun_id
            agent_id
        }
    }
`

export const UPDATE_FLOWRUN = gql`
    mutation($input: FlowRunInput!) {
        update_flowrun(input: $input) {
            id
        }
    }
`