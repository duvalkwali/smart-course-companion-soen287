function CourseDashboard(){
    return(
        <>
        <ul class="list bg-base-100 rounded-box shadow-md">
  
  <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Weekly table</li>
  
  <li class="list-row">
    <div class="text-4xl font-thin opacity-30 tabular-nums">01</div>
    <input type="checkbox" defaultChecked className="checkbox checkbox-md" />
     <div><img class="size-10 rounded-box" src="https://moodle.concordia.ca/moodle/theme/image.php/saimaniq/assign/1769581239/monologo?filtericon=1"/></div>
    <div class="list-col-grow">
      <div>Assignment 0</div>
      
    </div>
    <button class ="btn btn-square btn-ghost">
 <img class ="w-8.5" src ="https://img.icons8.com/?size=100&id=83268&format=png&color=000000" alt= "triple-dot"/>
    </button>
    <button class="btn btn-square btn-ghost">
      <img class = "w-8.5" src="https://img.icons8.com/?size=100&id=100135&format=png&color=000000"/>
      
    </button>
  </li>
  
  <li class="list-row">
    <div class="text-4xl font-thin opacity-30 tabular-nums">02</div>
    <input type="checkbox" defaultChecked className="checkbox checkbox-md" />
     <div><img class="size-10 rounded-box" src="https://moodle.concordia.ca/moodle/theme/image.php/saimaniq/assign/1769581239/monologo?filtericon=1"/></div>
    <div class="list-col-grow">
      <div>Lab 0</div>
   
    </div>
    <button class ="btn btn-square btn-ghost">
 <img class ="w-8.5" src ="https://img.icons8.com/?size=100&id=83268&format=png&color=000000" alt= "triple-dot"/>
    </button>
    <button class="btn btn-square btn-ghost">
      <img class = "w-8.5" src="https://img.icons8.com/?size=100&id=100135&format=png&color=000000"/>
    </button>
  </li>
  
  <li class="list-row">
    <div class="text-4xl font-thin opacity-30 tabular-nums">03</div>
    <input type="checkbox" defaultChecked className="checkbox checkbox-md" />
    <div><img class="size-10 rounded-box" src="https://moodle.concordia.ca/moodle/theme/image.php/saimaniq/assign/1769581239/monologo?filtericon=1"/></div>
    <div class="list-col-grow">
      <div>Group assignment</div>
      <div class="text-xs uppercase font-semibold opacity-60">Requires minimum team of 2</div>
    </div>
    <button class ="btn btn-square btn-ghost">
 <img class ="w-8.5" src ="https://img.icons8.com/?size=100&id=83268&format=png&color=000000" alt= "triple-dot"/>
    </button>
   
    <button class="btn btn-square btn-ghost">
      <img class = "w-8.5" src="https://img.icons8.com/?size=100&id=100135&format=png&color=000000" alt= "Access"/>
    </button>
  </li>
  
</ul>
        </>
    )
}
export default CourseDashboard