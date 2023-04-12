import React, { useState } from 'react';

function Page({ templates }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = templates.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(templates.length / itemsPerPage)
    const pageNumbers = [];

  
    // Add page number buttons
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
        <button key={i} onClick={() => setCurrentPage(i)} className={`${i === currentPage ? 'active' : null} bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4`}>
            {i}
        </button>
        );
    }

    const temps = currentItems.map(template => {
        return (
            <div key={template.name} className="group transition-all ease-in-out hover:scale-105 my-2 h-52 w-full max-w-[350px] overflow-hidden rounded relative bg-white shadow-[0px_4px_30px_rgba(0,0,0,0.08)]">
                <div className="p-4 pt-6">
                    <h3 className="text-2xl mb-4 line-clamp-2 font-semibold ">{template.name}</h3>
                    <p className="mb-4 line-clamp-2">{template.description}</p>
                </div>
        
                <button className="w-full h-10 pl-6 absolute bottom-0 text-lime-500 bg-gray-200 group-hover:bg-lime-500 group-hover:text-white text-left">Use Template</button>
            </div>
        )
    })

    return (
        <div className=''>
            <div className="grid lg:grid-cols-3 xs:grid-cols-2 place-items-center xs:gap-12 ">
                {temps}
            </div>
            

            <div className='flex flex-row justify-between mt-14'>
                <button key="back" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="block bg-gray-300 hover:bg-lime-500 text-gray-800 hover:text-white font-bold py-2 px-4 rounded-l-lg">
                    <span>{'< Previous'}</span>
                </button>
                
                <div>
                    <div className='inline-block border rounded-md border-neutral-700 w-7 h-7 text-center mx-2'>
                        {currentPage}
                    </div> 
                    <span>of {pageNumbers.length}</span>
                </div>
                
                <button key="next" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="bg-gray-300 hover:bg-lime-500 text-gray-800 hover:text-white font-bold py-2 px-4 rounded-r-lg">
                    <span>{'Next >'}</span>
                </button>
            </div>
        </div>
    );
}

export default Page