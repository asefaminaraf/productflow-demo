const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const seed={
 tasks:[
 {id:"PF-101",title:"Add low-stock alert for retailers",status:"In progress",priority:"High",assignee:"Nadia",type:"Feature",due:"2026-12-02"},
 {id:"PF-102",title:"Improve order search and filters",status:"To do",priority:"Medium",assignee:"Rahim",type:"Feature",due:"2026-12-05"},
 {id:"PF-103",title:"Fix duplicate payment submission",status:"In progress",priority:"High",assignee:"Sami",type:"Bug",due:"2026-11-29"},
 {id:"PF-104",title:"Create weekly sales summary",status:"Done",priority:"Medium",assignee:"Nadia",type:"Feature",due:"2026-11-20"},
 {id:"PF-105",title:"Update retailer onboarding flow",status:"To do",priority:"Low",assignee:"Ayesha",type:"Improvement",due:"2026-12-10"},
 {id:"PF-106",title:"Add delivery status notifications",status:"Done",priority:"High",assignee:"Rahim",type:"Feature",due:"2026-11-18"},
 {id:"PF-107",title:"Validate inventory adjustment history",status:"To do",priority:"Medium",assignee:"Sami",type:"Improvement",due:"2026-12-08"},
 {id:"PF-108",title:"Optimize dashboard loading time",status:"In progress",priority:"High",assignee:"Nadia",type:"Bug",due:"2026-12-01"}
 ],
 initiatives:[
 {id:1,title:"Retailer experience improvement",desc:"Make daily sales, inventory and collection activities easier for small retailers.",status:"In progress",priority:"High",owner:"Product team",target:"Q4 2026",progress:65},
 {id:2,title:"Order management enhancement",desc:"Improve order discovery, processing visibility and delivery coordination.",status:"Planned",priority:"High",owner:"Operations + Product",target:"Q1 2027",progress:20},
 {id:3,title:"Inventory accuracy",desc:"Give retailers and operations teams more reliable stock visibility and alerts.",status:"In progress",priority:"Medium",owner:"Product + Engineering",target:"Q1 2027",progress:45},
 {id:4,title:"Product analytics foundation",desc:"Introduce actionable reporting for sales, adoption and operational performance.",status:"Discovery",priority:"Medium",owner:"Product team",target:"Q2 2027",progress:10}
 ],
 prds:[
 {id:1,title:"Low-stock alert for retailers",area:"Inventory",status:"In review",updated:"Nov 22, 2026",problem:"Retailers often discover stock shortages only when they try to sell an item. This can lead to missed sales and poor customer experience.",goal:"Notify retailers when available stock reaches a configurable threshold.",stories:"As a retailer, I want to receive a low-stock alert so that I can replenish products before they run out.",criteria:"Given stock is at or below the configured threshold, when inventory updates, then an alert is displayed with product name and available quantity."},
 {id:2,title:"Order tracking and delivery visibility",area:"Order management",status:"Draft",updated:"Nov 20, 2026",problem:"Retailers have limited visibility into the current status of submitted orders.",goal:"Show a clear order lifecycle and latest status.",stories:"As a retailer, I want to track my order so that I know when it will arrive.",criteria:"Given an order is submitted, when its status changes, then the latest status and timestamp are visible."}
 ],
 feedback:[
 {id:1,message:"I want to know when a frequently sold product is almost out of stock.",category:"Inventory",priority:"High",status:"Under review"},
 {id:2,message:"It takes too long to find older orders.",category:"Orders",priority:"Medium",status:"New"},
 {id:3,message:"Please show collection history by date.",category:"Payments",priority:"Medium",status:"New"},
 {id:4,message:"I sometimes submit the same payment twice by mistake.",category:"Payments",priority:"High",status:"Under review"},
 {id:5,message:"A simple daily sales summary would save time.",category:"Reporting",priority:"Low",status:"Planned"}
 ]
};
let data;try{data=JSON.parse(localStorage.getItem("productflow-data"))||structuredClone(seed)}catch(e){data=structuredClone(seed)}
function save(){localStorage.setItem("productflow-data",JSON.stringify(data));renderAll()}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function pill(value){let cls=value==="Done"?"done":value==="In progress"?"progress":value==="High"?"high":value==="Medium"?"medium":value==="Low"?"low":"todo";return `<span class="pill ${cls}">${esc(value)}</span>`}
function toast(msg){let t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300)}
const pages={dashboard:"Overview",roadmap:"Roadmap",backlog:"Backlog & Sprints",prd:"PRD Library",feedback:"User Feedback",analytics:"Analytics"};
function go(page){$$(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+page));$$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));$("#pageCrumb").textContent=pages[page];$("#sidebar").classList.remove("open");}
$("#navigation").addEventListener("click",e=>{let b=e.target.closest("[data-page]");if(b)go(b.dataset.page)});
document.addEventListener("click",e=>{let g=e.target.closest("[data-go]");if(g)go(g.dataset.go);let a=e.target.closest("[data-action]");if(a)openModal(a.dataset.action)});
$("#mobileMenu").onclick=()=>$("#sidebar").classList.toggle("open");
function renderDashboard(){
 let total=data.tasks.length,done=data.tasks.filter(t=>t.status==="Done").length,open=total-done;
 $("#statInitiatives").textContent=data.initiatives.length;$("#statTasks").textContent=open;$("#statDone").textContent=done;$("#statFeedback").textContent=data.feedback.filter(f=>f.status==="New"||f.status==="Under review").length;
 let pct=total?Math.round(done/total*100):0;$("#completionRate").textContent=pct+"%";$("#completionBar").style.width=pct+"%";
 $("#milestoneList").innerHTML=data.initiatives.slice(0,3).map(i=>`<div class="milestone"><i class="milestone-dot"></i><div><b>${esc(i.title)}</b><small>${esc(i.target)} · ${esc(i.status)}</small></div></div>`).join("")||'<div class="no-data">No initiatives yet.</div>';
 $("#recentTasks").innerHTML=data.tasks.slice(0,5).map(t=>`<tr><td><span class="task-id">${esc(t.id)}</span><span class="task-name">${esc(t.title)}</span></td><td>${pill(t.status)}</td><td>${pill(t.priority)}</td><td>${esc(t.assignee)}</td></tr>`).join("");
}
function renderRoadmap(){ $("#roadmapList").innerHTML=data.initiatives.map(i=>`<article class="roadmap-card"><div><h3>${esc(i.title)}</h3><p>${esc(i.desc)}</p><div class="roadmap-meta">${pill(i.status)}${pill(i.priority)}<span class="pill">${esc(i.owner)}</span></div></div><div class="roadmap-side"><small>Target delivery</small><b>${esc(i.target)}</b><small>Progress · ${i.progress}%</small><div class="progress-track"><div class="progress-fill" style="width:${i.progress}%"></div></div></div></article>`).join("")||'<div class="empty">No initiatives yet. Create your first roadmap item.</div>'}
function renderBoard(){let statuses=["To do","In progress","Done"];$("#taskBoard").innerHTML=statuses.map(s=>{let tasks=data.tasks.filter(t=>t.status===s);return `<div class="board-column"><div class="column-head">${s}<span class="count">${tasks.length}</span></div>${tasks.map(t=>`<div class="task-card"><h4>${esc(t.title)}</h4><p>${esc(t.id)} · ${esc(t.type)}</p><div class="task-card-foot">${pill(t.priority)}<small>${esc(t.assignee)}</small></div><div class="card-actions" style="margin-top:10px"><button class="mini-btn" data-edit-task="${t.id}">Edit</button><button class="mini-btn" data-next-task="${t.id}">${s==="To do"?"Start":s==="In progress"?"Complete":"Reopen"}</button></div></div>`).join("")||'<div class="no-data">No tasks here</div>'}</div>`}).join("")}
function renderPrds(){ $("#prdList").innerHTML=data.prds.map(p=>`<article class="prd-card"><span class="tag">${esc(p.area)}</span><h3>${esc(p.title)}</h3><p>${esc(p.problem)}</p><div class="prd-foot"><small>${esc(p.status)} · Updated ${esc(p.updated)}</small><button class="text-btn" data-view-prd="${p.id}">Open PRD ↗</button></div></article>`).join("")||'<div class="empty">No PRDs yet. Create your first product requirement document.</div>'}
function renderFeedback(){ $("#feedbackTable").innerHTML=data.feedback.map(f=>`<tr><td style="max-width:360px;white-space:normal;color:#344052;font-weight:600">${esc(f.message)}</td><td>${esc(f.category)}</td><td>${pill(f.priority)}</td><td><select class="inline-select" data-feedback-status="${f.id}"><option ${f.status==="New"?"selected":""}>New</option><option ${f.status==="Under review"?"selected":""}>Under review</option><option ${f.status==="Planned"?"selected":""}>Planned</option><option ${f.status==="Resolved"?"selected":""}>Resolved</option></select></td><td><button class="mini-btn" data-delete-feedback="${f.id}">Delete</button></td></tr>`).join("")||'<tr><td colspan="5" class="empty">No feedback yet.</td></tr>'}
function renderAnalytics(){let total=data.tasks.length,done=data.tasks.filter(t=>t.status==="Done").length,pct=total?Math.round(done/total*100):0;$("#analyticCompletion").textContent=pct+"%";$("#analyticHigh").textContent=data.tasks.filter(t=>t.priority==="High"&&t.status!=="Done").length;$("#analyticReview").textContent=data.feedback.filter(f=>f.status==="New"||f.status==="Under review").length;$("#analyticInitiatives").textContent=data.initiatives.length;let counts=["To do","In progress","Done"].map(s=>[s,data.tasks.filter(t=>t.status===s).length]);let max=Math.max(1,...counts.map(x=>x[1]));$("#statusBars").innerHTML=counts.map(([s,n])=>`<div class="bar-row"><span>${s}</span><div class="bar-track"><div class="bar-fill" style="width:${n/max*100}%"></div></div><b>${n}</b></div>`).join("")}
function renderAll(){renderDashboard();renderRoadmap();renderBoard();renderPrds();renderFeedback();renderAnalytics()}
let currentAction="",editingId=null;
function field(label,name,type="text",value="",opts=[]){let id="f-"+name;if(type==="textarea")return `<div class="field"><label for="${id}">${label}</label><textarea id="${id}" name="${name}" required>${esc(value)}</textarea></div>`;if(type==="select")return `<div class="field"><label for="${id}">${label}</label><select id="${id}" name="${name}">${opts.map(o=>`<option ${o===value?"selected":""}>${esc(o)}</option>`).join("")}</select></div>`;return `<div class="field"><label for="${id}">${label}</label><input id="${id}" name="${name}" type="${type}" value="${esc(value)}" required></div>`}
function openModal(action,record=null){currentAction=action;editingId=record?.id??null;let title="",fields="";
if(action==="new-task"||action==="edit-task"){title=action==="edit-task"?"Edit task":"Create task";fields=field("Task title","title","text",record?.title||"")+field("Description / type","type","select",record?.type||"Feature",["Feature","Bug","Improvement","Research"])+field("Status","status","select",record?.status||"To do",["To do","In progress","Done"])+field("Priority","priority","select",record?.priority||"Medium",["High","Medium","Low"])+field("Assignee","assignee","text",record?.assignee||"Product team")+field("Due date","due","date",record?.due||"2026-12-10")}
if(action==="new-initiative"){title="Create initiative";fields=field("Initiative name","title")+field("Description","desc","textarea")+field("Status","status","select","Planned",["Discovery","Planned","In progress","Done"])+field("Priority","priority","select","Medium",["High","Medium","Low"])+field("Owner","owner")+field("Target quarter","target","text","Q1 2027")+field("Progress (%)","progress","number","0")}
if(action==="new-prd"){title="Create PRD";fields=field("PRD title","title")+field("Product area","area")+field("Problem statement","problem","textarea")+field("Objective / expected outcome","goal","textarea")+field("User story","stories","textarea")+field("Acceptance criteria","criteria","textarea")}
if(action==="new-feedback"){title="Add user feedback";fields=field("Feedback message","message","textarea")+field("Category","category","select","Inventory",["Inventory","Orders","Payments","Reporting","User experience"])+field("Priority","priority","select","Medium",["High","Medium","Low"])+field("Status","status","select","New",["New","Under review","Planned","Resolved"])}
$("#modalTitle").textContent=title;$("#modalFields").innerHTML=fields;$("#modalBackdrop").classList.add("show");}
function closeModal(){$("#modalBackdrop").classList.remove("show")}
$("#closeModal").onclick=closeModal;$("#cancelModal").onclick=closeModal;$("#modalBackdrop").addEventListener("click",e=>{if(e.target.id==="modalBackdrop")closeModal()});
$("#itemForm").addEventListener("submit",e=>{e.preventDefault();let v=Object.fromEntries(new FormData(e.target).entries());
if(currentAction==="new-task"||currentAction==="edit-task"){if(editingId){let t=data.tasks.find(x=>x.id===editingId);Object.assign(t,v)}else data.tasks.unshift({id:"PF-"+(109+data.tasks.length),...v});}
if(currentAction==="new-initiative")data.initiatives.unshift({id:Date.now(),...v,progress:Math.max(0,Math.min(100,Number(v.progress)||0))});
if(currentAction==="new-prd")data.prds.unshift({id:Date.now(),...v,status:"Draft",updated:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})});
if(currentAction==="new-feedback")data.feedback.unshift({id:Date.now(),...v});
closeModal();save();toast("Saved successfully");e.target.reset()});
$("#taskBoard").addEventListener("click",e=>{let edit=e.target.closest("[data-edit-task]");if(edit){let r=data.tasks.find(t=>t.id===edit.dataset.editTask);openModal("edit-task",r)}let next=e.target.closest("[data-next-task]");if(next){let t=data.tasks.find(x=>x.id===next.dataset.nextTask);t.status=t.status==="To do"?"In progress":t.status==="In progress"?"Done":"To do";save();toast("Task status updated")}});
$("#feedbackTable").addEventListener("change",e=>{let el=e.target.closest("[data-feedback-status]");if(el){let f=data.feedback.find(x=>x.id==el.dataset.feedbackStatus);f.status=el.value;save();toast("Feedback status updated")}});
$("#feedbackTable").addEventListener("click",e=>{let b=e.target.closest("[data-delete-feedback]");if(b&&confirm("Delete this feedback item?")){data.feedback=data.feedback.filter(f=>f.id!=b.dataset.deleteFeedback);save();toast("Feedback deleted")}});
$("#prdList").addEventListener("click",e=>{let b=e.target.closest("[data-view-prd]");if(!b)return;let p=data.prds.find(x=>x.id==b.dataset.viewPrd);alert(`${p.title}\n\nPROBLEM\n${p.problem}\n\nOBJECTIVE\n${p.goal}\n\nUSER STORY\n${p.stories}\n\nACCEPTANCE CRITERIA\n${p.criteria}`)});
$("#exportBtn").onclick=()=>{let blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="productflow-workspace-data.json";a.click();URL.revokeObjectURL(url);toast("Workspace data exported")};
renderAll();