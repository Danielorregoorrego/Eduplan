const KEY = 'eduplan_carreras_v7';
const careersSeed = [
  'Pedagogía en Educación Física','Pedagogía en Educación Parvularia','Pedagogía en Lenguaje y Comunicación','Pedagogía en Biología y Ciencias naturales','Pedagogía en Ingles','Pedagogía en Educación Básica con menciones','Pedagogía en Matemáticas'
].map((name,i)=>({id:'car'+(i+1), name, code:'PLAN-'+String(i+1).padStart(2,'0'), status:'Activo'}));
const dimensions = [
  {id:'d1', name:'Dimensión Docencia y Resultados del proceso formativo', criteria:['c1','c2','c3','c4']},
  {id:'d2', name:'Dimensión Gestión Estratégica y Recursos Institucionales', criteria:['c5']},
  {id:'d3', name:'Dimensión Gestión Aseguramiento Interno de la Calidad', criteria:['c6']}
];
const criteria = [
  {id:'c1', dimensionId:'d1', name:'Criterio 1 Perfil de egreso', desc:'Pertinencia, consistencia, actualización, validación y trazabilidad del perfil de egreso.'},
  {id:'c2', dimensionId:'d1', name:'Criterio 2 Plan de estudio y resultados del proceso formativo', desc:'Coherencia del plan, progresión, resultados de aprendizaje, evaluación e indicadores del proceso formativo.'},
  {id:'c3', dimensionId:'d1', name:'Criterio 3 Formación Práctica', desc:'Organización, progresión, acompañamiento, centros de práctica, evaluación y retroalimentación.'},
  {id:'c4', dimensionId:'d1', name:'Criterio 4 Cuerpo Académico', desc:'Suficiencia, idoneidad, dedicación, productividad, desarrollo académico y cobertura.'},
  {id:'c5', dimensionId:'d2', name:'Criterio 5 Gobierno y Gestión de Recursos', desc:'Gobierno, gestión, recursos humanos, físicos, tecnológicos, financieros y apoyo a la operación.'},
  {id:'c6', dimensionId:'d3', name:'Criterio 6 Aseguramiento Interno de la Calidad', desc:'Autorregulación, uso de datos, seguimiento, evaluación, mejora continua y resultados verificables.'}
];

const levelRubrics = {
  c1: {
    'Nivel 1': 'La acción permite asegurar condiciones básicas del perfil de egreso: formalización, difusión, coherencia con fundamentos de la profesión docente, estándares pedagógicos y disciplinarios vigentes, proyecto institucional, modelo educativo, denominación del título y orientación del plan de estudios.',
    'Nivel 2': 'La acción incorpora validación con actores internos y externos, socialización con profesores, estudiantes, empleadores y centros de práctica, y procedimientos formalizados de monitoreo del avance del perfil, considerando resultados de la Evaluación Nacional Diagnóstica.',
    'Nivel 3': 'La acción se inserta en un sistema de gestión curricular formalizado, con evaluación periódica del perfil, uso de resultados de desempeño durante la trayectoria formativa, seguimiento de titulados e inserción laboral para retroalimentar y ajustar el perfil de egreso.'
  },
  c2: {
    'Nivel 1': 'La acción asegura condiciones de diseño e implementación del plan: coherencia con modelo educativo y perfil de egreso, incorporación de estándares FID vigentes, caracterización estudiantil, resultados de aprendizaje verificables y mecanismos de monitoreo, incluida la END.',
    'Nivel 2': 'La acción aplica sistemáticamente mecanismos de revisión y mejora del plan de estudios, evidencia coherencia entre resultados de aprendizaje, evaluaciones y actividades formativas, y usa análisis de retención, progresión, asignaturas críticas, titulación y titulación oportuna para ejecutar mejoras.',
    'Nivel 3': 'La acción demuestra articulación integral del proceso formativo, revisión permanente de actividades formativas y evaluativas, relación docencia-investigación, hitos progresivos para observar el logro del perfil y evaluación de resultados de las mejoras para tomar decisiones.'
  },
  c3: {
    'Nivel 1': 'La acción fortalece la base formal de la formación práctica: carácter temprano y progresivo, normativa, compromiso con aprendizaje profesional, funciones de actores, ética evaluativa, acompañamiento, supervisión y coordinación inicial con centros de práctica.',
    'Nivel 2': 'La acción amplía y sistematiza desempeños prácticos en contextos diversos, niveles educativos y áreas curriculares pertinentes, asegurando articulación y comunicación con tutores y centros para resguardar coherencia formativa y capacidades de acompañamiento.',
    'Nivel 3': 'La acción evalúa desempeños reales en centros de práctica mediante seguimiento para la mejora continua, instala interlocución permanente entre universidad y comunidades educativas, y evidencia bidireccionalidad de la vinculación con el medio desde la práctica.'
  },
  c4: {
    'Nivel 1': 'La acción asegura dotación suficiente, idoneidad disciplinar, profesional y pedagógica, normas de ingreso y evaluación, inducción al modelo educativo y espacios de análisis de prácticas docentes orientados a la formación de futuros profesores.',
    'Nivel 2': 'La acción instala evaluación permanente para mejorar dotación, estabilidad, dedicación y carrera académica, desarrolla formación docente y disciplinar sistemática, articula experiencia escolar con formación teórico-práctica y promueve investigación relevante para la FID.',
    'Nivel 3': 'La acción demuestra que el desarrollo disciplinar y pedagógico del cuerpo académico incide en la mejora formativa, integra VcM en evaluación académica y retroalimentación curricular, e instala resultados de investigación, innovación y creación difundidos hacia comunidad académica y sistema escolar.'
  },
  c5: {
    'Nivel 1': 'La acción asegura condiciones básicas de gobierno y recursos: instancia directiva con dedicación y atribuciones, personal de apoyo, plan de gestión, información clara a estudiantes, comité o núcleo docente e instalaciones y mecanismos de planificación y mantención de recursos.',
    'Nivel 2': 'La acción evalúa y ajusta planes de mejora y gestión, opera mecanismos sistemáticos de coordinación entre unidades, aplica mecanismos transversales para adquisición, mantención y actualización de recursos, y formaliza atención de solicitudes y necesidades estudiantiles.',
    'Nivel 3': 'La acción usa información sobre logro de objetivos, metas y resultados para la mejora continua, y gestiona instalaciones y equipamiento con criterios de vigencia tecnológica, operación y satisfacción de usuarios.'
  },
  c6: {
    'Nivel 1': 'La acción asegura análisis crítico sistemático, información de titulados, aplicación de políticas institucionales de calidad en admisión, plan, enseñanza-aprendizaje, evaluación, progresión y perfil, además de cumplimiento de EDI, END y planes con responsables, plazos y difusión interna.',
    'Nivel 2': 'La acción utiliza información diagnóstica, incluida la END, para diseñar e implementar mejora continua, apoya inserción y seguimiento de titulados e instala monitoreo y evaluación sistemáticos con evidencias del logro progresivo del perfil y del mejoramiento continuo.',
    'Nivel 3': 'La acción demuestra implementación y monitoreo de planes de mejoramiento o desarrollo, asegura recursos asociados, cumple metas sucesivas y evidencia resultados coherentes con políticas institucionales, realizando ajustes para fortalecer la calidad formativa.'
  }
};
function rubricText(criterionId, level){ return levelRubrics[criterionId]?.[level] || 'Selecciona criterio y nivel para ver la interpretación.'; }
function evidenceCount(a){ return (Array.isArray(a.verifications)?a.verifications.length:0) + (String(a.evidence||'').trim()?1:0); }
function hasEvidence(a){ return evidenceCount(a)>0; }
function evidenceCoverage(filter={}){ const acts=linkedActionList(filter); if(!acts.length) return 0; return Math.round(acts.filter(hasEvidence).length*100/acts.length); }
function fmtSize(bytes){ bytes=Number(bytes)||0; if(bytes<1024) return bytes+' B'; if(bytes<1024*1024) return Math.round(bytes/1024)+' KB'; return (bytes/1024/1024).toFixed(1)+' MB'; }

const $ = id => document.getElementById(id);
const today = () => new Date().toISOString().slice(0,10);
const esc = v => String(v ?? '').replace(/[&<>\"]/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
const avg = arr => arr.length ? Math.round(arr.reduce((a,b)=>a+(Number(b)||0),0)/arr.length) : 0;
const crit = id => criteria.find(x=>x.id===id);
const dim = id => dimensions.find(x=>x.id===id);
function seed(){
  const findings = [
    ['car1','c1','Debilidad','Perfil de egreso requiere mayor especificidad y trazabilidad con estándares vigentes.','Alta'],
    ['car1','c2','Debilidad','Se requiere evidenciar con mayor claridad resultados verificables en asignaturas críticas, progresión y ajustes curriculares.','Alta'],
    ['car1','c6','Oportunidad de mejora','Fortalecer el uso sistemático de datos para tomar decisiones y reportar avances mensuales.','Alta'],
    ['car2','c3','Oportunidad de mejora','Consolidar instrumentos comunes para seguimiento de práctica progresiva y retroalimentación de centros.','Media'],
    ['car3','c4','Oportunidad de mejora','Formalizar plan de desarrollo académico asociado a productividad, cobertura y perfeccionamiento.','Media']
  ].map((f,i)=>({id:'f'+(i+1), careerId:f[0], criterionId:f[1], dimensionId:crit(f[1]).dimensionId, type:f[2], description:f[3], priority:f[4], createdAt:today()}));
  const actions = [
    ['car1','c1','f1','Actualizar matriz de trazabilidad del perfil de egreso con estándares vigentes, programas y evidencias de validación.','% de componentes trazados','100% de competencias y programas trazados','Jefatura de Carrera / Comité Curricular','2026-08-30',55,'En proceso','Nivel 2','Actas, matriz de trazabilidad, programas ajustados'],
    ['car1','c2','f2','Implementar tablero de seguimiento para asignaturas críticas, progresión, aprobación y medidas remediales.','Tablero activo y reportes generados','1 tablero + reportes mensuales','Jefatura de Carrera','2026-09-30',45,'En proceso','Nivel 2','Reporte UCAMPUS / planilla de seguimiento'],
    ['car1','c6','f3','Generar reporte ejecutivo mensual de avance, evidencias, decisiones y resultados por criterio.','N° reportes emitidos','6 reportes durante el año','Comité de Acreditación','2026-12-15',30,'En proceso','Nivel 3','Carpeta de reportes mensuales'],
    ['car2','c3','f4','Estandarizar rúbricas de práctica y protocolo de retroalimentación con centros educativos.','N° instrumentos validados','5 instrumentos validados','Coordinación de Prácticas','2026-10-30',25,'En proceso','Nivel 2','Rúbricas y actas de validación'],
    ['car3','c4','f5','Diseñar plan anual de desarrollo del cuerpo académico con metas de perfeccionamiento y productividad.','Plan aprobado','1 plan anual validado','Dirección de Departamento','2026-08-15',60,'En proceso','Nivel 2','Plan de desarrollo académico']
  ].map((a,i)=>({id:'a'+(i+1), careerId:a[0], criterionId:a[1], dimensionId:crit(a[1]).dimensionId, findingId:a[2], name:a[3], indicator:a[4], target:a[5], owner:a[6], start:'2026-03-01', end:a[7], progress:a[8], status:a[9], level:a[10], evaluation:'No evaluado', evidence:a[11], verifications:[], notes:''}));
  return {careers:structuredClone(careersSeed), findings, actions, updatedAt:new Date().toISOString()};
}
let state = load();
function load(){
  try{ const data = JSON.parse(localStorage.getItem(KEY)); return normalize(data || seed()); } catch { return seed(); }
}
function normalize(data){
  data.careers = Array.isArray(data.careers) && data.careers.length ? data.careers : structuredClone(careersSeed);
  data.findings = Array.isArray(data.findings) ? data.findings : [];
  data.actions = Array.isArray(data.actions) ? data.actions : [];
  data.findings.forEach(f=>{ if(!f.dimensionId && f.criterionId) f.dimensionId = crit(f.criterionId)?.dimensionId || 'd1'; });
  data.actions.forEach(a=>{ if(!a.dimensionId && a.criterionId) a.dimensionId = crit(a.criterionId)?.dimensionId || 'd1'; a.progress = Math.max(0,Math.min(100,Number(a.progress)||0)); if(!Array.isArray(a.verifications)) a.verifications=[]; const f=data.findings.find(x=>x.id===a.findingId); if(f){ a.careerId=f.careerId; a.criterionId=f.criterionId; a.dimensionId=f.dimensionId; } });
  return data;
}
function save(){ state.updatedAt = new Date().toISOString(); localStorage.setItem(KEY, JSON.stringify(state)); }
function refresh(){ save(); renderAll(); }
const career = id => state.careers.find(x=>x.id===id);
const finding = id => state.findings.find(x=>x.id===id);
function actionList(filter={}){ const {careerId='all',dimensionId='all',criterionId='all',status='all'}=filter; return state.actions.filter(a=>(careerId==='all'||a.careerId===careerId)&&(dimensionId==='all'||a.dimensionId===dimensionId)&&(criterionId==='all'||a.criterionId===criterionId)&&(status==='all'||a.status===status)); }
function findingList(filter={}){ const {careerId='all',dimensionId='all',criterionId='all',type='all'}=filter; return state.findings.filter(f=>(careerId==='all'||f.careerId===careerId)&&(dimensionId==='all'||f.dimensionId===dimensionId)&&(criterionId==='all'||f.criterionId===criterionId)&&(type==='all'||f.type===type)); }
function linkedActionsForFinding(findingId){ return state.actions.filter(a=>a.findingId===findingId); }
function findingProgress(findingId){ return avg(linkedActionsForFinding(findingId).map(a=>a.progress)); }
function coverage(filter={}){ const finds=findingList(filter); if(!finds.length) return 0; return Math.round(finds.filter(f=>linkedActionsForFinding(f.id).length>0).length*100/finds.length); }
function linkedActionList(filter={}){ return actionList(filter).filter(a=>a.findingId && finding(a.findingId)); }
function progress(filter){ return avg(linkedActionList(filter).map(a=>a.progress)); }
function isRisk(a){ return a.status==='Atrasado' || (a.status!=='Cumplido' && a.end && a.end < today()) || Number(a.progress)<40; }
function cls(x){ const p=typeof x==='object'?Number(x.progress):Number(x); const s=typeof x==='object'?x.status:''; if(s==='Atrasado') return 'danger'; if(s==='Cumplido'||p>=80) return 'ok'; if(s==='No iniciado') return 'idle'; return p>=50?'warn':'danger'; }
function traffic(p){ return p>=80?'Verde':p>=50?'Amarillo':'Rojo'; }
function fillSelect(id, items, allLabel){ const el=$(id); if(!el) return; const old=el.value; el.innerHTML=(allLabel?`<option value="all">${allLabel}</option>`:'')+items.map(i=>`<option value="${i.id}">${esc(i.name)}</option>`).join(''); if([...el.options].some(o=>o.value===old)) el.value=old; }
function fillCriteria(id, allLabel, dimensionId='all'){ fillSelect(id, dimensionId==='all'?criteria:criteria.filter(c=>c.dimensionId===dimensionId), allLabel); }
function initSelects(){
  ['dashCareer','filterCareer','reportCareer'].forEach(id=>fillSelect(id,state.careers,'Todas las carreras'));
  fillSelect('matrixCareer',state.careers,null);
  ['dashDimension','filterDimension'].forEach(id=>fillSelect(id,dimensions,'Todas las dimensiones'));
  fillCriteria('filterCriterion','Todos los criterios',$('filterDimension')?.value || 'all');
  ['findingCareer','actionCareer'].forEach(id=>fillSelect(id,state.careers,null));
  ['findingDimension','actionDimension'].forEach(id=>fillSelect(id,dimensions,null));
  fillCriteria('findingCriterion',null,$('findingDimension')?.value || 'd1');
  fillCriteria('actionCriterion',null,$('actionDimension')?.value || 'd1');
  updateActionFindingOptions();
}
function bar(label,value,tag=''){ return `<div class="progress-row"><strong>${esc(label)}</strong><div class="bar"><div class="fill" style="width:${value}%"></div></div><span>${value}%</span><span class="status ${cls(value)}">${tag || traffic(value)}</span></div>`; }
function criteriaStatus(filter={}){
  const {careerId='all',dimensionId='all'}=filter;
  return criteria.filter(c=>dimensionId==='all'||c.dimensionId===dimensionId).map(c=>{
    const acts=linkedActionList({careerId,criterionId:c.id});
    const finds=findingList({careerId,criterionId:c.id});
    const uncovered=finds.filter(f=>linkedActionsForFinding(f.id).length===0).length;
    return {criterion:c, actions:acts.length, findings:finds.length, uncovered, progress:progress({careerId,criterionId:c.id}), coverage:coverage({careerId,criterionId:c.id}), evidence:evidenceCoverage({careerId,criterionId:c.id})};
  });
}
function coverageTile(row){
  const stateClass = row.actions===0 ? 'danger' : (row.uncovered>0 ? 'warn' : 'ok');
  const msg = row.actions===0 ? 'Sin acciones evaluables' : (row.uncovered>0 ? `${row.uncovered} hallazgo(s) sin cubrir` : 'Cobertura completa');
  return `<article class="coverage-tile ${stateClass}"><div><b>${esc(row.criterion.name)}</b><span>${esc(dim(row.criterion.dimensionId)?.name)}</span></div><strong>${row.progress}%</strong><p>${msg}</p><small>${row.actions} acciones · ${row.findings} hallazgos · ${row.coverage}% cobertura · ${row.evidence}% MV</small></article>`;
}
function renderDashboard(){
  const careerId=$('dashCareer')?.value || 'all', dimensionId=$('dashDimension')?.value || 'all';
  const acts=linkedActionList({careerId,dimensionId}), finds=findingList({careerId,dimensionId});
  const global=avg(acts.map(a=>a.progress));
  $('kpiGlobal').textContent = global+'%';
  $('kpiActions').textContent = acts.length;
  $('kpiWeak').textContent = finds.filter(f=>f.type==='Debilidad').length;
  $('kpiOpp').textContent = finds.filter(f=>f.type==='Oportunidad de mejora').length;
  $('kpiRisk').textContent = acts.filter(isRisk).length;
  $('kpiCoverage').textContent = coverage({careerId,dimensionId})+'%';
  if($('kpiEvidence')) $('kpiEvidence').textContent = evidenceCoverage({careerId,dimensionId})+'%';
  if($('donutValue')) $('donutValue').textContent = global+'%';
  if($('globalDonut')) $('globalDonut').style.setProperty('--pct', global);
  if($('heroState')) $('heroState').textContent = global>=80 ? 'Avance favorable' : global>=50 ? 'Avance intermedio' : acts.length ? 'Avance crítico o inicial' : 'Sin acciones evaluables';
  if($('heroDetail')) $('heroDetail').textContent = `${acts.length} acciones evaluables · ${coverage({careerId,dimensionId})}% cobertura de hallazgos · ${evidenceCoverage({careerId,dimensionId})}% con medio de verificación.`;
  if($('heroTitle')) $('heroTitle').textContent = careerId==='all' ? 'Estado general de las siete carreras' : career(careerId)?.name || 'Estado general de avance';
  document.querySelectorAll('.kpis article').forEach((card,i)=>{ card.classList.remove('ok','warn','danger','idle'); if(i===0) card.classList.add(cls(global)); });
  $('careerProgress').innerHTML = state.careers.map(c=>bar(c.name,progress({careerId:c.id,dimensionId}),c.code+' · cob. '+coverage({careerId:c.id,dimensionId})+'% · evid. '+evidenceCoverage({careerId:c.id,dimensionId})+'%')).join('');
  $('dimensionProgress').innerHTML = dimensions.map(d=>bar(d.name,progress({careerId,dimensionId:d.id}),'cob. '+coverage({careerId,dimensionId:d.id})+'% · evid. '+evidenceCoverage({careerId,dimensionId:d.id})+'%')).join('');
  $('criterionProgress').innerHTML = criteria.filter(c=>dimensionId==='all'||c.dimensionId===dimensionId).map(c=>bar(c.name,progress({careerId,criterionId:c.id}),'cob. '+coverage({careerId,criterionId:c.id})+'% · evid. '+evidenceCoverage({careerId,criterionId:c.id})+'%')).join('');
  if($('coverageMap')) $('coverageMap').innerHTML = criteriaStatus({careerId,dimensionId}).map(coverageTile).join('');
  const rows=acts.filter(isRisk).sort((a,b)=>a.progress-b.progress).slice(0,10);
  $('criticalRows').innerHTML = rows.map(a=>{ const f=finding(a.findingId); return `<tr><td>${esc(career(a.careerId)?.name)}</td><td>${esc(crit(a.criterionId)?.name)}</td><td><b>${esc(f?.type||'')}</b><br>${esc((f?.description||'').slice(0,90))}</td><td>${esc(a.name)}</td><td>${esc(a.owner)}</td><td>${esc(a.end)}</td><td>${a.progress}%</td><td><span class="status ${cls(a)}">${esc(a.status)}</span></td></tr>`; }).join('') || '<tr><td colspan="8" class="muted">No hay acciones críticas con el filtro actual.</td></tr>';
}
function findingCards(list){ return list.map(f=>{ const acts=linkedActionsForFinding(f.id); const fp=findingProgress(f.id); const covered=acts.length>0; return `<article class="finding-card ${covered?'covered':'uncovered'}"><span class="pill">${esc(f.priority)}</span><p>${esc(f.description)}</p><div class="coverage-note ${covered?'ok':'danger'}">${covered?'Cubierto por acciones evaluables':'Sin acción evaluable asociada'}</div><div class="actions-mini"><strong>Acciones asociadas: ${acts.length} · avance del hallazgo: ${fp}%</strong>${acts.slice(0,4).map(a=>`<div>• ${esc(a.name)} (${a.progress}%)</div>`).join('')}</div><div class="card-actions"><button class="btn mini ghost" onclick="editFinding('${f.id}')">Editar</button><button class="btn mini primary" onclick="newActionForFinding('${f.id}')">Agregar acción</button><button class="btn mini danger" onclick="deleteFinding('${f.id}')">Eliminar</button></div></article>`; }).join('') || '<p class="muted">Sin registros. Agrega una debilidad u oportunidad para este criterio.</p>'; }
function renderMatrix(){
  const carId=$('matrixCareer')?.value || state.careers[0].id; let html='';
  dimensions.forEach(d=>{ html += `<h3 class="dimension-title">${esc(d.name)}</h3>`; criteria.filter(c=>c.dimensionId===d.id).forEach(c=>{ const weak=findingList({careerId:carId,criterionId:c.id,type:'Debilidad'}); const opp=findingList({careerId:carId,criterionId:c.id,type:'Oportunidad de mejora'}); const acts=actionList({careerId:carId,criterionId:c.id}); html += `<details class="criterion-block" open><summary><span>${esc(c.name)}</span><span class="badge">${acts.length} acciones · ${progress({careerId:carId,criterionId:c.id})}% avance · ${coverage({careerId:carId,criterionId:c.id})}% cobertura</span></summary><p class="muted">${esc(c.desc)}</p><div class="grid two"><section><h4>Debilidades de pares evaluadores</h4>${findingCards(weak)}</section><section><h4>Oportunidades de mejora</h4>${findingCards(opp)}</section></div></details>`; }); });
  $('accordion').innerHTML=html;
}
function renderActions(){
  const filter={careerId:$('filterCareer')?.value||'all', dimensionId:$('filterDimension')?.value||'all', criterionId:$('filterCriterion')?.value||'all', status:$('filterStatus')?.value||'all'};
  $('actionsRows').innerHTML = actionList(filter).map(a=>{ const f=finding(a.findingId); return `<tr><td>${esc(career(a.careerId)?.name)}</td><td>${esc(dim(a.dimensionId)?.name)}</td><td>${esc(crit(a.criterionId)?.name)}<br><span class="pill">${esc(a.level)}</span><br><span class="muted">${esc(rubricText(a.criterionId,a.level)).slice(0,110)}...</span></td><td>${f?`<b>${esc(f.type)}</b><br>${esc(f.description).slice(0,120)}${f.description.length>120?'...':''}`:'Sin asociar'}</td><td>${esc(a.name)}<br><span class="muted">Eval.: ${esc(a.evaluation)}</span><br><span class="pill">MV: ${evidenceCount(a)}</span></td><td><b>${esc(a.indicator)}</b><br>${esc(a.target)}</td><td>${esc(a.owner)}<br><span class="muted">${esc(a.end)}</span></td><td>${a.progress}%</td><td><span class="status ${cls(a)}">${esc(a.status)}</span></td><td><button class="linkbtn" onclick="editAction('${a.id}')">Editar</button><br><button class="linkbtn" onclick="deleteAction('${a.id}')">Eliminar</button></td></tr>`; }).join('') || '<tr><td colspan="10" class="muted">No hay acciones con los filtros seleccionados.</td></tr>';
}
function reportLines(carId='all'){
  const acts=linkedActionList({careerId:carId}); const finds=findingList({careerId:carId});
  const title=carId==='all'?'Todas las carreras':career(carId)?.name;
  let txt=`REPORTE EJECUTIVO EDUPLAN\nCarrera: ${title}\nFecha: ${new Date().toLocaleDateString('es-CL')}\n\n`;
  txt+=`1. RESUMEN GENERAL\n`;
  txt+=`- Avance global: ${avg(acts.map(a=>a.progress))}%\n- Acciones evaluables registradas: ${acts.length}\n- Debilidades declaradas: ${finds.filter(f=>f.type==='Debilidad').length}\n- Oportunidades de mejora declaradas: ${finds.filter(f=>f.type==='Oportunidad de mejora').length}\n- Acciones en riesgo: ${acts.filter(isRisk).length}\n- Cobertura de hallazgos con acciones asociadas: ${coverage({careerId:carId})}%\n- Acciones con medio de verificación: ${evidenceCoverage({careerId:carId})}%\n\n`;
  txt+=`2. TABLA EJECUTIVA POR DIMENSIÓN\nDimensión | Acciones | Avance | Cobertura hallazgos | Medios de verificación | Observación\n`;
  dimensions.forEach(d=>{ const n=linkedActionList({careerId:carId,dimensionId:d.id}).length; txt+=`${d.name} | ${n} | ${progress({careerId:carId,dimensionId:d.id})}% | ${coverage({careerId:carId,dimensionId:d.id})}% | ${evidenceCoverage({careerId:carId,dimensionId:d.id})}% | ${n?'Con acciones registradas':'SIN ACCIONES: requiere definir acciones evaluables'}\n`; });
  txt+=`\n3. TABLA EJECUTIVA POR CRITERIO\nCriterio | Acciones | Hallazgos | Hallazgos sin cubrir | Avance | Cobertura | MV | Estado\n`;
  criteriaStatus({careerId:carId}).forEach(r=>{ txt+=`${r.criterion.name} | ${r.actions} | ${r.findings} | ${r.uncovered} | ${r.progress}% | ${r.coverage}% | ${r.evidence}% | ${r.actions===0?'SIN ACCIONES':(r.uncovered>0?'CON BRECHAS SIN CUBRIR':'CUBIERTO')}\n`; });
  const noActions=criteriaStatus({careerId:carId}).filter(r=>r.actions===0);
  txt+=`\n4. DIMENSIONES Y CRITERIOS SIN ACCIONES DECLARADAS\n`;
  if(noActions.length){ noActions.forEach(r=>txt+=`- ${dim(r.criterion.dimensionId)?.name} / ${r.criterion.name}: no registra acciones evaluables, por tanto no aporta avance al dashboard.\n`); }
  else txt+='- Todos los criterios poseen al menos una acción evaluable registrada.\n';
  const uncovered=findingList({careerId:carId}).filter(f=>linkedActionsForFinding(f.id).length===0);
  txt+=`\n5. HALLAZGOS SIN ACCIONES ASOCIADAS\n`;
  if(uncovered.length){ uncovered.forEach(f=>txt+=`- ${career(f.careerId)?.name} | ${crit(f.criterionId)?.name} | ${f.type}: ${f.description}\n`); }
  else txt+='- No se registran hallazgos descubiertos.\n';
  txt+=`\n6. ACCIONES CRÍTICAS\n`;
  const risky=acts.filter(isRisk).sort((a,b)=>a.progress-b.progress).slice(0,15);
  txt+=risky.length?risky.map(a=>`- ${career(a.careerId)?.name} | ${crit(a.criterionId)?.name}: ${a.name} (${a.progress}%, ${a.status}, responsable: ${a.owner}, término: ${a.end || 'sin fecha'}).`).join('\n'):'- No se registran acciones críticas con el filtro actual.';
  txt+=`\n\n7. LECTURA EJECUTIVA\nEl avance del sistema se calcula exclusivamente desde acciones evaluables vinculadas a debilidades u oportunidades de mejora. Los criterios sin acciones quedan explícitamente identificados para evitar interpretar ausencia de datos como cumplimiento.\n`;
  return txt;
}

function reportHtml(carId='all'){
  const title=carId==='all'?'Todas las carreras':career(carId)?.name;
  const acts=linkedActionList({careerId:carId});
  const finds=findingList({careerId:carId});
  const cstats=criteriaStatus({careerId:carId});
  const global=avg(acts.map(a=>a.progress));
  const noActions=cstats.filter(r=>r.actions===0);
  const uncovered=finds.filter(f=>linkedActionsForFinding(f.id).length===0);
  const risky=acts.filter(isRisk).sort((a,b)=>a.progress-b.progress).slice(0,12);
  const trDim=dimensions.map(d=>{
    const n=linkedActionList({careerId:carId,dimensionId:d.id}).length;
    const obs=n?'Con acciones registradas':'SIN ACCIONES: requiere definir acciones evaluables';
    return `<tr class="${n?'':'row-alert'}"><td>${esc(d.name)}</td><td>${n}</td><td>${progress({careerId:carId,dimensionId:d.id})}%</td><td>${coverage({careerId:carId,dimensionId:d.id})}%</td><td>${evidenceCoverage({careerId:carId,dimensionId:d.id})}%</td><td>${obs}</td></tr>`;
  }).join('');
  const trCrit=cstats.map(r=>`<tr class="${r.actions===0?'row-alert':(r.uncovered>0?'row-warn':'')}"><td>${esc(dim(r.criterion.dimensionId)?.name)}</td><td>${esc(r.criterion.name)}</td><td>${r.actions}</td><td>${r.findings}</td><td>${r.uncovered}</td><td>${r.progress}%</td><td>${r.coverage}%</td><td>${r.evidence}%</td><td>${r.actions===0?'SIN ACCIONES':(r.uncovered>0?'CON HALLAZGOS SIN CUBRIR':'CUBIERTO')}</td></tr>`).join('');
  const trRisk=risky.map(a=>{ const f=finding(a.findingId); return `<tr><td>${esc(career(a.careerId)?.name)}</td><td>${esc(crit(a.criterionId)?.name)}</td><td>${esc(f?.type||'')}</td><td>${esc(a.name)}</td><td>${esc(a.owner)}</td><td>${esc(a.end||'Sin fecha')}</td><td>${a.progress}%</td><td><span class="status ${cls(a)}">${esc(a.status)}</span></td></tr>`; }).join('') || '<tr><td colspan="8" class="muted">No se registran acciones críticas.</td></tr>';
  return `<div class="report-cover"><div><p class="eyebrow">EDUPLAN</p><h2>Reporte ejecutivo de seguimiento</h2><p>${esc(title)} · ${new Date().toLocaleDateString('es-CL')}</p></div><div class="report-score"><strong>${global}%</strong><span>avance global</span></div></div>
  <div class="report-cards"><article><b>${acts.length}</b><span>acciones</span></article><article><b>${finds.filter(f=>f.type==='Debilidad').length}</b><span>debilidades</span></article><article><b>${finds.filter(f=>f.type==='Oportunidad de mejora').length}</b><span>oportunidades</span></article><article><b>${coverage({careerId:carId})}%</b><span>cobertura</span></article><article><b>${evidenceCoverage({careerId:carId})}%</b><span>medios verificación</span></article><article><b>${risky.length}</b><span>acciones críticas</span></article></div>
  <h4>Tabla ejecutiva por dimensión</h4><div class="table-wrap"><table class="exec-table"><thead><tr><th>Dimensión</th><th>Acciones</th><th>Avance</th><th>Cobertura</th><th>MV</th><th>Observación</th></tr></thead><tbody>${trDim}</tbody></table></div>
  <h4>Tabla ejecutiva por criterio</h4><div class="table-wrap"><table class="exec-table"><thead><tr><th>Dimensión</th><th>Criterio</th><th>Acciones</th><th>Hallazgos</th><th>Sin cubrir</th><th>Avance</th><th>Cobertura</th><th>MV</th><th>Estado</th></tr></thead><tbody>${trCrit}</tbody></table></div>
  <h4>Criterios sin acciones declaradas</h4><div class="alert-box">${noActions.length?'<ul>'+noActions.map(r=>`<li><b>${esc(r.criterion.name)}</b>: no registra acciones evaluables y no aporta avance al dashboard.</li>`).join('')+'</ul>':'Todos los criterios poseen al menos una acción evaluable.'}</div>
  <h4>Hallazgos sin acciones asociadas</h4><div class="alert-box">${uncovered.length?'<ul>'+uncovered.map(f=>`<li><b>${esc(career(f.careerId)?.name)} · ${esc(crit(f.criterionId)?.name)} · ${esc(f.type)}</b>: ${esc(f.description)}</li>`).join('')+'</ul>':'No se registran hallazgos descubiertos.'}</div>
  <h4>Acciones críticas</h4><div class="table-wrap"><table class="exec-table"><thead><tr><th>Carrera</th><th>Criterio</th><th>Tipo</th><th>Acción</th><th>Responsable</th><th>Fecha término</th><th>Avance</th><th>Estado</th></tr></thead><tbody>${trRisk}</tbody></table></div>
  <p class="executive-note"><b>Lectura ejecutiva:</b> El avance se calcula solo con acciones evaluables vinculadas a debilidades u oportunidades de mejora. Por eso, una dimensión o criterio sin acciones queda reportado explícitamente como brecha de planificación y seguimiento.</p>`;
}

function renderReport(){ $('reportText').value=reportLines($('reportCareer')?.value || 'all'); if($('reportHtml')) $('reportHtml').innerHTML=reportHtml($('reportCareer')?.value || 'all'); }
function dashboardSummary(){
  const careerId=$('dashCareer')?.value || 'all', dimensionId=$('dashDimension')?.value || 'all';
  let txt=`RESUMEN DASHBOARD EDUPLAN\nFiltro carrera: ${careerId==='all'?'Todas':career(careerId)?.name}\nFiltro dimensión: ${dimensionId==='all'?'Todas':dim(dimensionId)?.name}\nFecha: ${new Date().toLocaleString('es-CL')}\n\n`;
  const acts=linkedActionList({careerId,dimensionId}), finds=findingList({careerId,dimensionId});
  txt+=`Avance global: ${avg(acts.map(a=>a.progress))}%\nAcciones: ${acts.length}\nDebilidades: ${finds.filter(f=>f.type==='Debilidad').length}\nOportunidades: ${finds.filter(f=>f.type==='Oportunidad de mejora').length}\nEn riesgo: ${acts.filter(isRisk).length}\nCobertura hallazgos: ${coverage({careerId,dimensionId})}%\nMedios de verificación: ${evidenceCoverage({careerId,dimensionId})}%\n\nCRITERIOS\n`;
  criteriaStatus({careerId,dimensionId}).forEach(r=>txt+=`- ${r.criterion.name}: ${r.progress}% avance; ${r.actions} acciones; ${r.coverage}% cobertura; ${r.evidence}% MV; ${r.actions===0?'SIN ACCIONES':(r.uncovered>0?'brechas sin cubrir':'cubierto')}.\n`);
  return txt;
}
function renderConfig(){ $('configList').innerHTML=dimensions.map(d=>`<div class="config-dim"><h4>${esc(d.name)}</h4>${criteria.filter(c=>c.dimensionId===d.id).map(c=>`<details class="criterion-block" open><summary><span>${esc(c.name)}</span><span class="badge">Rúbrica Nivel 1–3</span></summary><p class="muted">${esc(c.desc)}</p><div class="rubric-grid"><article><b>Nivel 1</b><p>${esc(rubricText(c.id,'Nivel 1'))}</p></article><article><b>Nivel 2</b><p>${esc(rubricText(c.id,'Nivel 2'))}</p></article><article><b>Nivel 3</b><p>${esc(rubricText(c.id,'Nivel 3'))}</p></article></div></details>`).join('')}</div>`).join(''); }
function renderAll(){ initSelects(); renderDashboard(); renderMatrix(); renderActions(); renderReport(); renderConfig(); }
function setCriterionOptions(prefix){ const d=$(prefix+'Dimension').value; fillCriteria(prefix+'Criterion',null,d); if(prefix==='action') updateActionFindingOptions(); }
function updateActionFindingOptions(){ if(!$('actionFinding')) return; const car=$('actionCareer')?.value, c=$('actionCriterion')?.value, old=$('actionFinding').value; const opts=state.findings.filter(f=>f.careerId===car && f.criterionId===c); $('actionFinding').innerHTML='<option value="">Selecciona un hallazgo</option>'+opts.map(f=>`<option value="${f.id}">${esc(f.type)}: ${esc(f.description).slice(0,90)}</option>`).join(''); if([...$('actionFinding').options].some(o=>o.value===old)) $('actionFinding').value=old; }
function openFindingDialog(f={}){ $('findingId').value=f.id||''; $('findingCareer').value=f.careerId||$('matrixCareer').value||state.careers[0].id; $('findingDimension').value=f.dimensionId||'d1'; setCriterionOptions('finding'); $('findingCriterion').value=f.criterionId||criteria.find(c=>c.dimensionId===$('findingDimension').value).id; $('findingType').value=f.type||'Debilidad'; $('findingDescription').value=f.description||''; $('findingPriority').value=f.priority||'Alta'; $('findingTitle').textContent=f.id?'Editar hallazgo':'Agregar debilidad / oportunidad'; $('findingDialog').showModal(); }
function openActionDialog(a={}){ $('actionId').value=a.id||''; $('actionCareer').value=a.careerId||$('matrixCareer').value||state.careers[0].id; $('actionDimension').value=a.dimensionId||'d1'; setCriterionOptions('action'); $('actionCriterion').value=a.criterionId||criteria.find(c=>c.dimensionId===$('actionDimension').value).id; updateActionFindingOptions(); $('actionFinding').value=a.findingId||''; $('actionName').value=a.name||''; $('actionIndicator').value=a.indicator||''; $('actionTarget').value=a.target||''; $('actionOwner').value=a.owner||''; $('actionStart').value=a.start||today(); $('actionEnd').value=a.end||''; $('actionProgress').value=a.progress??0; $('actionStatus').value=a.status||'No iniciado'; $('actionLevel').value=a.level||'Nivel 2'; $('actionEvaluation').value=a.evaluation||'No evaluado'; $('actionEvidence').value=a.evidence||''; currentVerifications=Array.isArray(a.verifications)?structuredClone(a.verifications):[]; renderEvidenceList(); updateRubricPreview(); $('actionNotes').value=a.notes||''; $('actionTitle').textContent=a.id?'Editar acción evaluable':'Nueva acción evaluable'; $('actionDialog').showModal(); }
window.editFinding=id=>openFindingDialog(finding(id));
window.deleteFinding=id=>{ const acts=linkedActionsForFinding(id); if(acts.length){ alert('No se puede eliminar este hallazgo porque tiene acciones evaluables asociadas. Elimina o reasigna primero esas acciones.'); return; } if(confirm('Eliminar hallazgo sin acciones asociadas?')){ state.findings=state.findings.filter(f=>f.id!==id); refresh(); } };
window.newActionForFinding=id=>{ const f=finding(id); openActionDialog({careerId:f.careerId,dimensionId:f.dimensionId,criterionId:f.criterionId,findingId:id,status:'No iniciado',progress:0,level:'Nivel 2'}); };
window.editAction=id=>openActionDialog(state.actions.find(a=>a.id===id));
window.deleteAction=id=>{ if(confirm('Eliminar acción evaluable?')){ state.actions=state.actions.filter(a=>a.id!==id); refresh(); alert('Acción eliminada. El dashboard fue recalculado.'); } };
$('addFindingBtn').onclick=()=>openFindingDialog(); $('addActionBtn').onclick=()=>openActionDialog();
$('findingDimension').onchange=()=>setCriterionOptions('finding'); $('actionDimension').onchange=()=>setCriterionOptions('action'); $('actionCareer').onchange=updateActionFindingOptions; $('actionCriterion').onchange=updateActionFindingOptions;
$('saveFinding').onclick=e=>{ e.preventDefault(); const id=$('findingId').value||'f'+Date.now(); const item={id, careerId:$('findingCareer').value, dimensionId:$('findingDimension').value, criterionId:$('findingCriterion').value, type:$('findingType').value, description:$('findingDescription').value, priority:$('findingPriority').value, createdAt:today()}; const ix=state.findings.findIndex(x=>x.id===id); ix>=0?state.findings[ix]=item:state.findings.push(item); $('findingDialog').close(); refresh(); };
$('saveAction').onclick=e=>{ e.preventDefault(); const f=finding($('actionFinding').value); if(!f){ alert('Cada acción evaluable debe tributar obligatoriamente a una debilidad u oportunidad de mejora. Primero declara el hallazgo y luego selecciona la vinculación.'); return; } const id=$('actionId').value||'a'+Date.now(); const p=Math.max(0,Math.min(100,Number($('actionProgress').value)||0)); const item={id, careerId:f.careerId, dimensionId:f.dimensionId, criterionId:f.criterionId, findingId:f.id, name:$('actionName').value, indicator:$('actionIndicator').value, target:$('actionTarget').value, owner:$('actionOwner').value, start:$('actionStart').value, end:$('actionEnd').value, progress:p, status:p>=100?'Cumplido':$('actionStatus').value, level:$('actionLevel').value, evaluation:$('actionEvaluation').value, evidence:$('actionEvidence').value, verifications:currentVerifications, notes:$('actionNotes').value}; const ix=state.actions.findIndex(x=>x.id===id); ix>=0?state.actions[ix]=item:state.actions.push(item); $('actionDialog').close(); refresh(); };
['dashCareer','dashDimension','matrixCareer','filterCareer','filterStatus','reportCareer'].forEach(id=>$(id).addEventListener('change',renderAll));
$('filterDimension').addEventListener('change',()=>{ fillCriteria('filterCriterion','Todos los criterios',$('filterDimension').value); renderActions(); renderDashboard(); renderReport(); });
$('filterCriterion').addEventListener('change',()=>{ renderActions(); renderDashboard(); renderReport(); });
document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>{ document.querySelectorAll('.nav').forEach(x=>x.classList.remove('active')); b.classList.add('active'); document.querySelectorAll('.view').forEach(v=>v.classList.remove('active')); $(b.dataset.view).classList.add('active'); $('title').textContent={dashboard:'Dashboard',matrix:'Matriz por carrera',actions:'Acciones evaluables',reports:'Reportabilidad',config:'Criterios CNA/FID'}[b.dataset.view]; renderAll(); });

let currentVerifications=[];
function renderEvidenceList(){
  const el=$('evidenceList'); if(!el) return;
  el.innerHTML = currentVerifications.length ? currentVerifications.map(v=>`<div class="evidence-item"><div><b>${esc(v.name)}</b><br><span class="muted">${esc(v.type||'archivo')} · ${fmtSize(v.size)} · ${esc(v.date||'')}</span></div><div><button type="button" class="btn mini ghost" onclick="downloadVerification('${v.id}')">Descargar</button><button type="button" class="btn mini danger" onclick="removeVerification('${v.id}')">Quitar</button></div></div>`).join('') : '<p class="muted">Sin archivos adjuntos. Puedes mantener links o adjuntar medios de verificación locales.</p>';
}
function updateRubricPreview(){ if($('levelRubricText')) $('levelRubricText').textContent = rubricText($('actionCriterion')?.value, $('actionLevel')?.value); }
window.removeVerification=id=>{ currentVerifications=currentVerifications.filter(v=>v.id!==id); renderEvidenceList(); };
window.downloadVerification=id=>{ const v=currentVerifications.find(x=>x.id===id); if(!v||!v.dataUrl) return; const a=document.createElement('a'); a.href=v.dataUrl; a.download=v.name; a.click(); };
if($('evidenceFiles')) $('evidenceFiles').addEventListener('change', async e=>{
  const files=[...e.target.files];
  for(const file of files){
    if(file.size > 2.5*1024*1024){ alert('Archivo omitido por tamaño superior a 2,5 MB: '+file.name); continue; }
    const dataUrl = await new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.onerror=rej; r.readAsDataURL(file); });
    currentVerifications.push({id:'mv'+Date.now()+Math.random().toString(16).slice(2), name:file.name, type:file.type||'archivo', size:file.size, date:new Date().toLocaleString('es-CL'), dataUrl});
  }
  e.target.value=''; renderEvidenceList();
});
['actionLevel','actionCriterion'].forEach(id=>{ if($(id)) $(id).addEventListener('change',updateRubricPreview); });

$('resetBtn').onclick=()=>{ if(confirm('Esto reemplazará los datos locales por la base inicial.')){ state=seed(); refresh(); } };
$('exportBtn').onclick=()=>download('eduplan_carreras_export.json',JSON.stringify({...state,dimensions,criteria,exportedAt:new Date().toISOString()},null,2),'application/json');
$('importBtn').onclick=()=>$('importFile').click();
$('importFile').onchange=async e=>{ const file=e.target.files[0]; if(!file) return; try{ const data=normalize(JSON.parse(await file.text())); if(confirm('Importar archivo y reemplazar datos actuales?')){ state={careers:data.careers,findings:data.findings,actions:data.actions}; refresh(); } } catch { alert('Archivo inválido. Usa un JSON exportado desde EDUPLAN.'); } e.target.value=''; };
$('csvBtn').onclick=()=>{ const rows=[['carrera','dimension','criterio','tipo_hallazgo','hallazgo','avance_hallazgo','accion','indicador','meta','responsable','inicio','termino','avance_accion','estado','nivel','evaluacion','evidencia_texto','medios_verificacion_adjuntos','observaciones']]; state.actions.forEach(a=>{ const f=finding(a.findingId); rows.push([career(a.careerId)?.name,dim(a.dimensionId)?.name,crit(a.criterionId)?.name,f?.type||'',f?.description||'',f?findingProgress(f.id):'',a.name,a.indicator,a.target,a.owner,a.start,a.end,a.progress,a.status,a.level,a.evaluation,a.evidence,(a.verifications||[]).map(v=>v.name).join(' | '),a.notes]); }); download('eduplan_acciones_carreras.csv',rows.map(r=>r.map(c=>`"${String(c??'').replace(/"/g,'""')}"`).join(';')).join('\n'),'text/csv;charset=utf-8'); };
$('copyReport').onclick=async()=>{ await navigator.clipboard.writeText($('reportText').value); alert('Reporte copiado'); };

function htmlDocument(title, body){
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>
  body{font-family:Arial,Helvetica,sans-serif;color:#162033;margin:28px;background:#fff} h1,h2,h3,h4{color:#0f2745} .eyebrow{color:#2563eb;font-weight:800;text-transform:uppercase;font-size:12px}.report-cover{background:#0f2745;color:#fff;border-radius:12px;padding:18px;margin-bottom:14px}.report-cover h2,.report-cover p{color:#fff}.report-score strong{font-size:36px}.report-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:14px 0}.report-cards article{border:1px solid #d9e2ec;border-radius:10px;padding:10px}.report-cards b{font-size:24px;display:block} table{width:100%;border-collapse:collapse;margin:10px 0 18px} th,td{border:1px solid #cbd5e1;padding:8px;text-align:left;vertical-align:top;font-size:12px} th{background:#0f2745;color:white}.alert-box{border:1px solid #fecaca;background:#fff7f7;border-radius:10px;padding:10px}.executive-note{border-left:5px solid #2563eb;background:#eff6ff;padding:10px}.status{font-weight:bold}.row-alert td{background:#fff1f2}.row-warn td{background:#fffbeb}@media print{body{margin:10mm}.no-print{display:none}}
  </style></head><body>${body}</body></html>`;
}
function downloadReportWord(){ const car=$('reportCareer')?.value || 'all'; download('eduplan_reporte_ejecutivo.doc', htmlDocument('Reporte EDUPLAN', reportHtml(car)), 'application/msword;charset=utf-8'); }
function downloadReportExcel(){ const car=$('reportCareer')?.value || 'all'; download('eduplan_reporte_ejecutivo.xls', htmlDocument('Reporte EDUPLAN Excel', reportHtml(car)), 'application/vnd.ms-excel;charset=utf-8'); }
function printReportPdf(){ const car=$('reportCareer')?.value || 'all'; openPrintWindow(htmlDocument('Reporte EDUPLAN', reportHtml(car))); }
function dashboardHtml(){
  const careerId=$('dashCareer')?.value || 'all', dimensionId=$('dashDimension')?.value || 'all';
  const title=`${careerId==='all'?'Todas las carreras':career(careerId)?.name} · ${dimensionId==='all'?'Todas las dimensiones':dim(dimensionId)?.name}`;
  const acts=linkedActionList({careerId,dimensionId}), finds=findingList({careerId,dimensionId});
  const rows=criteriaStatus({careerId,dimensionId}).map(r=>`<tr class="${r.actions===0?'row-alert':(r.uncovered>0?'row-warn':'')}"><td>${esc(dim(r.criterion.dimensionId)?.name)}</td><td>${esc(r.criterion.name)}</td><td>${r.actions}</td><td>${r.findings}</td><td>${r.uncovered}</td><td>${r.progress}%</td><td>${r.coverage}%</td><td>${r.evidence}%</td><td>${r.actions===0?'SIN ACCIONES':(r.uncovered>0?'HALLAZGOS SIN CUBRIR':'CUBIERTO')}</td></tr>`).join('');
  const riskRows=acts.filter(isRisk).map(a=>{const f=finding(a.findingId);return `<tr><td>${esc(career(a.careerId)?.name)}</td><td>${esc(crit(a.criterionId)?.name)}</td><td>${esc(f?.type||'')}</td><td>${esc(a.name)}</td><td>${esc(a.owner)}</td><td>${a.progress}%</td><td>${esc(a.status)}</td></tr>`}).join('') || '<tr><td colspan="7">Sin acciones críticas.</td></tr>';
  return `<h1>Resumen dashboard EDUPLAN</h1><p><b>Filtro:</b> ${esc(title)}<br><b>Fecha:</b> ${new Date().toLocaleString('es-CL')}</p>
  <table><tbody><tr><th>Avance global</th><td>${avg(acts.map(a=>a.progress))}%</td><th>Acciones</th><td>${acts.length}</td></tr><tr><th>Debilidades</th><td>${finds.filter(f=>f.type==='Debilidad').length}</td><th>Oportunidades</th><td>${finds.filter(f=>f.type==='Oportunidad de mejora').length}</td></tr><tr><th>En riesgo</th><td>${acts.filter(isRisk).length}</td><th>Cobertura hallazgos</th><td>${coverage({careerId,dimensionId})}%</td></tr><tr><th>Medios de verificación</th><td>${evidenceCoverage({careerId,dimensionId})}%</td><th>Criterios sin acciones</th><td>${criteriaStatus({careerId,dimensionId}).filter(r=>r.actions===0).length}</td></tr></tbody></table>
  <h2>Tabla por criterio</h2><table><thead><tr><th>Dimensión</th><th>Criterio</th><th>Acciones</th><th>Hallazgos</th><th>Sin cubrir</th><th>Avance</th><th>Cobertura</th><th>MV</th><th>Estado</th></tr></thead><tbody>${rows}</tbody></table>
  <h2>Acciones críticas</h2><table><thead><tr><th>Carrera</th><th>Criterio</th><th>Tipo</th><th>Acción</th><th>Responsable</th><th>Avance</th><th>Estado</th></tr></thead><tbody>${riskRows}</tbody></table>`;
}
function downloadDashboardWord(){ download('eduplan_resumen_dashboard.doc', htmlDocument('Resumen Dashboard EDUPLAN', dashboardHtml()), 'application/msword;charset=utf-8'); }
function downloadDashboardExcel(){ download('eduplan_resumen_dashboard.xls', htmlDocument('Resumen Dashboard EDUPLAN Excel', dashboardHtml()), 'application/vnd.ms-excel;charset=utf-8'); }
function printDashboardPdf(){ openPrintWindow(htmlDocument('Resumen Dashboard EDUPLAN', dashboardHtml())); }
function openPrintWindow(html){ const w=window.open('', '_blank'); if(!w){ alert('El navegador bloqueó la ventana emergente. Permite ventanas emergentes para imprimir o guardar en PDF.'); return; } w.document.open(); w.document.write(html); w.document.close(); setTimeout(()=>{ w.focus(); w.print(); }, 350); }

if($('downloadDashboardBtn')) $('downloadDashboardBtn').onclick=()=>download('eduplan_resumen_dashboard.txt',dashboardSummary(),'text/plain;charset=utf-8');
if($('downloadReportBtn')) $('downloadReportBtn').onclick=()=>download('eduplan_reporte_ejecutivo.txt',$('reportText').value,'text/plain;charset=utf-8');
if($('downloadReportHtmlBtn')) $('downloadReportHtmlBtn').onclick=()=>download('eduplan_reporte_ejecutivo.html','<!doctype html><html><head><meta charset="utf-8"><title>Reporte EDUPLAN</title><link rel="stylesheet" href="styles.css"></head><body><main class="print-report">'+reportHtml($('reportCareer')?.value || 'all')+'</main></body></html>','text/html;charset=utf-8');
if($('downloadReportWordBtn')) $('downloadReportWordBtn').onclick=downloadReportWord;
if($('downloadReportExcelBtn')) $('downloadReportExcelBtn').onclick=downloadReportExcel;
if($('printReportPdfBtn')) $('printReportPdfBtn').onclick=printReportPdf;
if($('downloadDashboardWordBtn')) $('downloadDashboardWordBtn').onclick=downloadDashboardWord;
if($('downloadDashboardExcelBtn')) $('downloadDashboardExcelBtn').onclick=downloadDashboardExcel;
if($('printDashboardPdfBtn')) $('printDashboardPdfBtn').onclick=printDashboardPdf;
function download(name,content,type){ const blob=new Blob([content],{type}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; a.click(); URL.revokeObjectURL(a.href); }
renderAll();
