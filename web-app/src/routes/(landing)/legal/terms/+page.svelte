<script>
    import { APP_EMAIL, APP_NAME } from '$lib/middleware/config';
</script>

<svelte:head>
  <title>{APP_NAME} Terms of Service</title>
</svelte:head>
  
<main>
    <h1>{APP_NAME} Terms of Service</h1>
    <p><strong>Revised Date: August 10, 2024</strong></p>
    

    <h2>1. Introduction</h2>
    <p>These Terms of Service ("Terms") govern your use of {APP_NAME}'s products and services, along with any associated apps, software, and websites (together, our "Services"). These Terms are a contract between you and {APP_NAME}, and they include our Acceptable Use Policy. By accessing our Services, you agree to these Terms.</p>
    
    
    <h2>2. Artificial Intelligence Ethical Use Policy</h2>
    <ul class="list-disc m-1 p-1">
      <li>

        <h4>Trust, But Verify Outputs</h4>
        <ol>
          <li>Artificial intelligence and large language models (LLMs) are frontier technologies that are still improving in accuracy, reliability and safety. When you use our Services, you acknowledge and agree:</li>
          <li>

          Outputs may not always be accurate and may contain material inaccuracies even if they appear accurate because of their level of detail or specificity.</li>
          <li>
          You should not rely on any Outputs without independently confirming their accuracy.</li>
          <li>
          The Services and any Outputs may not reflect correct, current, or complete information.</li>
          </ol>
      </li>
      <li>
            <h4>Don't compromise the privacy of others, including:</h4>
            <ol>
                <li>Collecting, processing, disclosing, inferring or generating personal data without complying with applicable legal requirements</li>
                <li>Using biometric systems for identification or assessment, including facial recognition</li>
                <li>Facilitating spyware, communications surveillance, or unauthorized monitoring of individuals</li>
            </ol>
        </li>
        <li>
            <h4>Don't perform or facilitate activities that may significantly impair the safety, wellbeing, or rights of others, including:</h4>
            <ol>
                <li>Providing tailored legal, medical/health, or financial advice without review by a qualified professional and disclosure of the use of AI assistance and its potential limitations</li>
                <li>Making high-stakes automated decisions in domains that affect an individual's safety, rights or well-being</li>
                <li>Facilitating real money gambling or payday lending</li>
                <li>Engaging in political campaigning or lobbying, including generating campaign materials personalized to or targeted at specific demographics</li>
                <li>Deterring people from participation in democratic processes</li>
            </ol>
        </li>
        <li>
            <h4>Don't misuse our platform to cause harm by intentionally deceiving or misleading others, including:</h4>
            <ol>
                <li>Generating or promoting disinformation, misinformation, or false online engagement</li>
                <li>Impersonating another individual or organization without consent or legal right</li>
                <li>Engaging in or promoting academic dishonesty</li>
                <li>Failing to ensure that automated systems disclose to people that they are interacting with AI, unless it's obvious from the context</li>
            </ol>
        </li>
    </ul>


    <h2>3. Account creation and access</h2>

    <p><strong>Your {APP_NAME} Account:</strong> To access our Services, we may ask you to create an Account. You agree to provide correct, current, and complete Account information. You may not share your Account login information with anyone else. You are responsible for all activity occurring under your Account.</p>

    <p>You may close your Account at any time by contacting us at {APP_EMAIL}.</p>

    <h2>4. Use of our Services</h2>
    <p>You may access and use our Services only in compliance with our Terms, our Acceptable Use Policy, and any guidelines or supplemental terms we may post on the Services (the "Permitted Use").</p>

    <p>You may not access or use, or help another person to access or use, our Services in any manner that violates these Terms or applicable laws.</p>

    <h2>5. Prompts, Outputs, and Materials</h2>
    <p>You may be allowed to submit text or other materials to our Services for processing (we call these "Prompts"). Our Services may generate responses based on your Prompts (we call these "Outputs"). Prompts and Outputs collectively are "Materials."</p>

    <p>You are responsible for all Prompts you submit to our Services. By submitting Prompts, you represent and warrant that you have all necessary rights and permissions.</p>

    <h2>6. Feedback</h2>
    <p>If you provide Feedback to us, you agree that we may use the Feedback however we choose without any obligation or payment to you.</p>

    <h2>7. Disclaimer of warranties and limitations of liability</h2>

    <p>The services are provided "as is" and "as available" without warranties of any kind. {APP_NAME} disclaims all warranties, express or implied.</p>


    <p>To the fullest extent permissible under applicable law, {APP_NAME} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>

    <h2>8. Changes to these terms</h2>
    <p>We may revise and update these Terms at our discretion. If you continue to access the Services after we post the updated Terms, you agree to the updated Terms.</p>

    <h2>9. Termination</h2>
    <p>We may suspend or terminate your access to the Services at any time if we believe that you have breached these Terms, or if we must do so to comply with law.</p>

    <h2>10. Contact Us</h2>
    <p>If you have any questions about these Terms of Service, please contact us at:   <a href="mailto:{APP_EMAIL}">{APP_EMAIL}</a>
    </p>

  </main>
<style>
   
   main {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333; 
      height: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      overflow-y: auto;
      padding-bottom: 50px;
      margin-bottom: 50px;
      
      overflow: auto !important;
  }
  h1, h2 {
      margin-top: 1.5rem;
      color: #2c3e50;
  }
  
  h1 {
        margin: 1rem 0;
        font-size: 2rem;
        color: #2c3e50;
    }
    h2 {
        margin: 1rem 0;
        font-size: 1.5rem;
        color: #34495e;
    }
    h3 {
        margin: 1rem 0;
        font-size: 1.2rem;
        color: #7f8c8d;
    }
    p {
        margin: 1rem 0;
    }
  .list-disc {
      list-style-type: disc;
      padding-left: 20px;
  }
  .mt-2 {
      margin-top: 0.5rem;
  }
  .mt-6 {
      margin-top: 1.5rem;
  }
  .text-lg {
      font-size: 1.125rem;
  }
  .font-bold {
      font-weight: bold;
  }
</style>