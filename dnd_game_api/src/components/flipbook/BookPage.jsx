import { useEffect, useState } from 'react';

export default function BookPage({children, getPageContentFunc}) {
    const [pageContent, setPageContent] = useState(children);

    useEffect(() => {
        if(!children){
            const content = "";

            getPageContentFunc().then((data) => {
                content = data;
            });

            setPageContent(children);
        }
    }, [children]);

  return (
    <>
        <div className="demoPage border border-gray-300 shadow-inner p-6 rounded-lg bg-gray-200">
           Teste
        </div>
    </>
  )
}


        // <BookPage getPageContentFunc={() => Promise.resolve("Page 1 content")}>
        //     {/* initial content can be passed as children */}
        //     Initial Page 1 Content
        // </BookPage>
        // <BookPage getPageContentFunc={() => Promise.resolve("Page 2 content")}>
        //   Teste
        // </BookPage>