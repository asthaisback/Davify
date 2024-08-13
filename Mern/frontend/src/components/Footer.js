import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-slate-200'>
      <div className='container mx-auto p-4'>
        <p className='text-center font-bold'>
          Interested in recruiting me? Let's Connect! 
          <br></br>
          <a href="mailto:guptaastha627@mail.com" className='text-blue-600 underline ml-2'>Email Me</a> or 
          <a href="https://www.linkedin.com/in/astha-gupta-55b208220" target="_blank" rel="noopener noreferrer" className='text-blue-600 underline ml-2'>Connect on LinkedIn</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
