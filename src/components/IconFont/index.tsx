import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_3604052_0pbmqy5i8ws.js', // ant design
    ],
});

type IconFontProps = React.ComponentProps<typeof IconFont>;

export default (props: IconFontProps) => {

    return (
        <>
            <IconFont {...props} />
        </>
    );
}
