import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CommentOutlined,
    CompassOutlined,
    DatabaseOutlined,
    FlagOutlined,
    LoginOutlined,
    MailOutlined,
    QuestionOutlined,
    TagOutlined
} from "@ant-design/icons";
import * as colors from "@contactlab/ds-tokens/constants/colors";



export const nodeConfig = (type) => {
    // eslint-disable-next-line default-case
    switch (type) {
        case "source":
            return {
                color: colors.success,
                icon: <DatabaseOutlined style={{ color: 'success' }} />
            };
        case "email":
            return {
                color: 'accent',
                icon: <MailOutlined style={{ color: 'accent' }} />
            };
        case "sms":
            return {
                color: 'default',
                icon: <CommentOutlined style={{ color: 'default' }} />
            };
        case "tag":
            return {
                color: 'default',
                icon: <TagOutlined style={{ color: 'default' }} />
            };
        case "webhook":
            return {
                color: 'default',
                icon: (
                    <QuestionOutlined
                        style={{ color: 'default', transform: "rotate(180deg)" }}
                    />
                )
            };
        case "waitThenCheck":
            return {
                color: 'warning',
                icon: <CheckCircleOutlined style={{ color: 'warning' }} />
            };
        case "waitForTrigger":
            return {
                color: 'warning',
                icon: <LoginOutlined style={{ color: 'warning' }} />
            };
        case "wait":
            return {
                color: 'default',
                icon: <ClockCircleOutlined style={{ color: 'default' }} />
            };
        case "abTest":
            return {
                color: 'default',
                icon: <CompassOutlined style={{ color: 'default' }} />
            };
        case "end":
            return {
                color: 'warning',
                icon: <FlagOutlined style={{ color: 'warning' }} />
            };
    }
};

export const LayoutOptions = {
    "elk.algorithm": "layered",
    "elk.direction": "DOWN",
    "elk.portAlignment.default": "CENTER",
    "elk.spacing.nodeNode": "40",
    "elk.spacing.portPort": "2"
};
