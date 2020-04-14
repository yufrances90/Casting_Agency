import { Message } from 'element-react';

const toast = {
    error: (message, title = 'Error') => {
        return Message.error(message);
    },
    success: (message, title = 'Success') => {
        return Notification.success(message);
    }
};

export default toast;