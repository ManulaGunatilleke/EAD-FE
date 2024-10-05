import emailjs from '@emailjs/browser';

const useSendEmailToCustomer = () => {
    // Custom hook logic here
    const sendEmailToCustomer = async (details) => { // Declare as async
        const templateParams = {
            subject: details.subject,
            to_email: details.toEmail,
            from_name: details.fromName,
            message: details.message
        };
    
        //need to update in .env file
        //return emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', templateParams, 'YOUR_EMAILJS_USER_ID')
        try {
            const response = await emailjs.send('service_wmhv7l5', 'template_ej1k5on', templateParams, '74A4X6ZlsIjisz-PA');
            console.log('Email notification sent:', response);
            return response;
        } catch (error) {
            console.error('Error sending email notification:', error);
            throw error; // Throw the error for handling in the component
        }
    };

    return { sendEmailToCustomer };
};

export default useSendEmailToCustomer;
