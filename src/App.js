import React, { useState, useEffect } from "react";
import data from "./data"
import Page from "./Page";
import SearchBar from "./SearchBar";

function App() {
  

  //const [templates, setTemplates] = useState([data.templates])
  const templates = data.templates

  {/*const fetchUserData = () => {
    fetch("https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTemplates(data)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])*/}

  const [renderedTemplates, setRenderedTemplates] = useState(templates)
  useEffect(() => {
      setRenderedTemplates(templates);
  }, [templates])

  const [orderType, setOrderType] = useState("Default")
  const [categoryType, setCategoryType] = useState("All")
  const [dateType, setDateType] = useState("Default")

  const alphaTemplates = [...renderedTemplates].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  const dateTemplates = [...renderedTemplates].sort((a, b) => {
    let dateA = new Date(a.created).getTime();
    let dateB = new Date(b.created).getTime();
    return dateA < dateB ? 1 : -1; 
  })

  
  function handleCategoryChange(event) {
    const { value } = event.target;
    setDateType("Default")
    setOrderType("Default")
    setCategoryType(value);
    
    if (value === "All") {
      setRenderedTemplates(templates);
    } else {
      const filteredTemplates = templates.filter((template) => template.category.includes(value));
      setRenderedTemplates(filteredTemplates);
    }
  }

  function handleOrderChange(event) {
    const { value } = event.target
    setOrderType(value)

    if (value === "Default") {
      setRenderedTemplates(templates)
    } else if (value === "Ascending") {
      //setRenderedTemplates(alphaTemplates)
      setRenderedTemplates(alphaTemplates)
    } else if (value === "Descending") {
      setRenderedTemplates(alphaTemplates.reverse())
    }
  }

  function handleDateChange(event) {
    const { value } = event.target
    setDateType(value)
    if (value === "Default") {
      setRenderedTemplates(templates)
    } else if (value === "Ascending") {
      //setRenderedTemplates(alphaTemplates)
      setRenderedTemplates(dateTemplates)
    } else if (value === "Descending") {
      setRenderedTemplates(dateTemplates.reverse())
    }
  }

  const [keyword, setKeyword] = useState('');
  const updateKeyword = (keyword) => {
    const filtered = templates.filter(temp => {
     return `${temp.name.toLowerCase()}`.includes(keyword.toLowerCase());
    })
    setKeyword(keyword);
    setRenderedTemplates(filtered);
  }

  return (
    <div className="sm:p-10 p-4">
      <div className="lg:flex justify-between items-center">
        <SearchBar keyword={keyword} onChange={updateKeyword}/>

        <div className="md:flex justify-center items-center max-w-sm:bg-slate-500">
          <span className="mr-4">Sort By:</span>
          {/*<div>
            <fieldset className="border rounded border-neutral-200 text-sm w-40 h-12 pl-6 flex item-center ">
              <legend className="text-xs text-neutral-400">Category</legend>
              <select name="sorts" id="sorts" value={categoryType} onChange={handleCategoryChange} className="bg-inherit">
                {categories.map(category => {return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  )}
                )}
              </select>
            </fieldset>
          </div>*/}
          <div className="flex">
            <div className="">
              <fieldset className="border rounded border-neutral-200 text-sm w-28 md:w-40 h-12 pl-6 flex item-center ">
                <legend className="text-xs text-neutral-400">Category</legend>
                <select name="sorts" id="sorts" value={categoryType} onChange={handleCategoryChange} className="bg-inherit">
                  <option value="All">All</option>
                  <option value="Education">Education</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Health">Health</option>
                </select>
              </fieldset>
            </div>

            <div className="ml-4">
              <fieldset className="border rounded border-neutral-200 text-sm w-28 md:w-40 h-12 pl-6 flex item-center ">
                <legend className="text-xs text-neutral-400">Order</legend>
                <select name="sorts" id="sorts" value={orderType} onChange={handleOrderChange} className="bg-inherit">
                  <option value="Default">Default</option>
                  <option value="Ascending">Ascending</option>
                  <option value="Descending">Descending</option>
                </select>
              </fieldset>
            </div>

            <div className="ml-4">
              <fieldset className="border rounded border-neutral-200 text-sm w-28 md:w-40 h-12 pl-6 flex item-center ">
                <legend className="text-xs text-neutral-400">Date</legend>
                <select name="sorts" id="sorts" value={dateType} onChange={handleDateChange} className="bg-inherit">
                  <option value="Default">Default</option>
                  <option value="Ascending">Ascending</option>
                  <option value="Descending">Descending</option>
                </select>
              </fieldset>
            </div>
          </div>
        </div>
      </div>

      <div className="h-16 mt-16 mb-10 w-full bg-orange-50 flex justify-center items-center">
          <div className="mr-5">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 23.4375C15.4008 23.4375 18.1828 22.2852 20.234 20.234C22.2852 18.1828 23.4375 15.4008 23.4375 12.5C23.4375 9.59919 22.2852 6.8172 20.234 4.76602C18.1828 2.71484 15.4008 1.5625 12.5 1.5625C9.59919 1.5625 6.8172 2.71484 4.76602 4.76602C2.71484 6.8172 1.5625 9.59919 1.5625 12.5C1.5625 15.4008 2.71484 18.1828 4.76602 20.234C6.8172 22.2852 9.59919 23.4375 12.5 23.4375ZM12.5 25C15.8152 25 18.9946 23.683 21.3388 21.3388C23.683 18.9946 25 15.8152 25 12.5C25 9.18479 23.683 6.00537 21.3388 3.66117C18.9946 1.31696 15.8152 0 12.5 0C9.18479 0 6.00537 1.31696 3.66117 3.66117C1.31696 6.00537 0 9.18479 0 12.5C0 15.8152 1.31696 18.9946 3.66117 21.3388C6.00537 23.683 9.18479 25 12.5 25Z" fill="#FC830A"/>
              <path d="M13.9531 10.2938L10.375 10.7422L10.2469 11.336L10.95 11.4656C11.4094 11.575 11.5 11.7406 11.4 12.1985L10.2469 17.6172C9.94374 19.0188 10.4109 19.6781 11.5094 19.6781C12.3609 19.6781 13.35 19.2844 13.7984 18.7438L13.9359 18.0938C13.6234 18.3688 13.1672 18.4781 12.864 18.4781C12.4344 18.4781 12.2781 18.1766 12.389 17.6453L13.9531 10.2938Z" fill="#FC830A"/>
              <path d="M12.5 8.59375C13.3629 8.59375 14.0625 7.8942 14.0625 7.03125C14.0625 6.16831 13.3629 5.46875 12.5 5.46875C11.6371 5.46875 10.9375 6.16831 10.9375 7.03125C10.9375 7.8942 11.6371 8.59375 12.5 8.59375Z" fill="#FC830A"/>
            </svg>
          </div>
          <span>Tada! Get started with a free template. Can’t find what you are looking for? Search from the 1000+ available templates</span>
      </div>

      <Page templates={renderedTemplates}/>
    </div>
  )

}

export default App;
