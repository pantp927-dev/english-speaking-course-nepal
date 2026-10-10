
const cfg=window.COURSE_CONFIG;

const whatsapp=(msg)=>
 `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(msg)}`;

const general=
 'Namaste! English Speaking Course A to Z (5 Parts, Rs.99) को बारेमा जानकारी चाहियो।';

document.getElementById('whatsappButton').href=whatsapp(general);

const paymentButton=document.getElementById('paymentButton');
const paymentDetails=document.getElementById('paymentDetails');

paymentButton.addEventListener('click',()=>{
 paymentDetails.hidden=!paymentDetails.hidden;
 paymentButton.setAttribute(
  'aria-expanded',
  String(!paymentDetails.hidden)
 );
 if(!paymentDetails.hidden){
  paymentDetails.scrollIntoView({
   behavior:'smooth',
   block:'nearest'
  });
 }
});

document.getElementById('paymentForm').addEventListener('submit',async e=>{
 e.preventDefault();

 const form=e.currentTarget;
 const status=document.getElementById('formStatus');
 const button=form.querySelector('button[type=submit]');

 button.disabled=true;
 status.textContent='Submitting...';

 try{
  const response=await fetch('/api/orders',{
   method:'POST',
   body:new FormData(form)
  });

  const result=await response.json();

  if(!response.ok){
   throw Error(result.error||'Submission failed');
  }

  status.textContent=
   '✅ Request received! We will verify your payment and send your private download link on WhatsApp.';

  form.reset();

  if(window.fbq){
   fbq('trackCustom','PaymentVerificationRequested');
  }

 }catch(err){
  status.textContent='❌ '+err.message;
 }finally{
  button.disabled=false;
 }
});

if(cfg.metaPixelId && /^\d+$/.test(cfg.metaPixelId)){
 !function(f,b,e,v,n,t,s){
  if(f.fbq)return;
  n=f.fbq=function(){
   n.callMethod?
   n.callMethod.apply(n,arguments):
   n.queue.push(arguments);
  };
  if(!f._fbq)f._fbq=n;
  n.push=n;
  n.loaded=!0;
  n.version='2.0';
  n.queue=[];
  t=b.createElement(e);
  t.async=!0;
  t.src=v;
  s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s);
 }(
  window,
  document,
  'script',
  'https://connect.facebook.net/en_US/fbevents.js'
 );

 fbq('init',cfg.metaPixelId);
 fbq('track','PageView');

 document.getElementById('whatsappButton')
  .addEventListener('click',()=>{
   fbq('track','Contact');
  });
}
