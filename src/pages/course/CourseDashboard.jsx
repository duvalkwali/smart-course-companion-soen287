
function CourseDashboard(){
    return(
        <>
        
        <ul className="list bg-base-100 rounded-box shadow-md">
  
  <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Weekly table</li>
  
  <li className="list-row">
    <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
    <input type="checkbox" defaultChecked className="checkbox checkbox-md" />
     <div><img className="size-10 rounded-box" src="https://moodle.concordia.ca/moodle/theme/image.php/saimaniq/assign/1769581239/monologo?filtericon=1"/></div>
    <div className="list-col-grow">
      <div>Assignment 0</div>
      
    </div>
    <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-square btn-ghost">
    <img
      className="w-8 h-8"
      src="https://img.icons8.com/?size=100&id=83268&format=png&color=000000"
      alt="triple-dot"
    />
  </div>

  <ul
    tabIndex={0}
    className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
  >
    <li>
      <button
        className="text-red-600"
        onClick={() => console.log("remove assignment")}
      >
        Remove assignment
      </button>
    </li>
  </ul>
</div>
    <button className="btn btn-square btn-ghost">
      <img className = "w-8.5" src="https://img.icons8.com/?size=100&id=100135&format=png&color=000000"/>
      
    </button>
  </li>
  
  <li className="list-row">
    <div className="text-4xl font-thin opacity-30 tabular-nums">02</div>
    <input type="checkbox" defaultChecked className="checkbox checkbox-md" />
     <div><img className="size-10 rounded-box" src="https://moodle.concordia.ca/moodle/theme/image.php/saimaniq/assign/1769581239/monologo?filtericon=1"/></div>
    <div className="list-col-grow">
      <div>Lab 0</div>
   
    </div>
    <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-square btn-ghost">
    <img
      className="w-8 h-8"
      src="https://img.icons8.com/?size=100&id=83268&format=png&color=000000"
      alt="triple-dot"
    />
  </div>

  <ul
    tabIndex={0}
    className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
  >
    <li>
      <button className="text-red-600" onClick={() => console.log("remove Lab 0")}>
        Remove assignment
      </button>
    </li>
  </ul>
</div>
    <button className="btn btn-square btn-ghost">
      <img className = "w-8.5" src="https://img.icons8.com/?size=100&id=100135&format=png&color=000000"/>
    </button>
  </li>
  
  <li className="list-row">
    <div className="text-4xl font-thin opacity-30 tabular-nums">03</div>
    <input type="checkbox" defaultChecked className="checkbox checkbox-md" />
    <div><img className="size-10 rounded-box" src="https://moodle.concordia.ca/moodle/theme/image.php/saimaniq/assign/1769581239/monologo?filtericon=1"/></div>
    <div className="list-col-grow">
      <div>Group assignment</div>
      <div className="text-xs uppercase font-semibold opacity-60">Requires minimum team of 2</div>
    </div>
    <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-square btn-ghost">
    <img
      className="w-8 h-8"
      src="https://img.icons8.com/?size=100&id=83268&format=png&color=000000"
      alt="triple-dot"
    />
  </div>

  <ul
    tabIndex={0}
    className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
  >
    <li>
      <button className="text-red-600" onClick={() => console.log("remove Group assignment")}>
        Remove assignment
      </button>
    </li>
  </ul>
</div>
   
    <button className="btn btn-square btn-ghost">
      <img className = "w-8.5" src="https://img.icons8.com/?size=100&id=100135&format=png&color=000000" alt= "Access"/>
    </button>
  </li>
  
</ul>
        </>
    )
}
export default CourseDashboard