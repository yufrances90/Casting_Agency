import { Notification } from 'element-react';

import 'element-theme-default';

const toast = {
    error: (message, title = 'Error') => {
        return Notification.error({
            title,
            message,
            duration: 0
        });
    },
    success: (message, title = 'Success') => {
        return Notification({
            title,
            message,
            type: 'success'
          });
    }
};

export default toast;