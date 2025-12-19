<script>
  import { Zap, Globe, Clock, Database, Headphones, SmilePlus, 
    BarChart3,BarChart2, Infinity, Gauge, Sparkles, Users, UserPlus, Cog, Shield, Rocket, Brain, Target, Compass, Laptop, MessageCircleQuestion, CreditCard, PhoneCall } from 'lucide-svelte';

  import { APP_ICON, APP_NAME, APP_SLOGAN } from "$lib/customize-site";

  const plans = [
    {
      name: 'Free ',
      description: 'For individuals  exploring the power of AI Research Agents.',
      url: '#',
      price: 0,
      features: [
        // { text: ' 100 queries / 24 hours', icon: Zap },
        { text: 'Access to cutting-edge LLMs', icon: Brain },
        { text: 'Discover curated content feed', icon: Compass },
        { text: 'Standard response times', icon: Clock },
        { text: 'Community support forums', icon: MessageCircleQuestion  }
      ]
    },
    {
      name: 'AI Research Professional',
      description: 'For professionals who want custom advanced AI Agents.',
      url: 'https://buy.stripe.com/8wMdTmdi1asl1xe3cc',
      price: 5,
      features: [
        // { text: '1,000 queries / 24 hours', icon: Rocket },
        { text: 'Custom dataset integration', icon: Database },
        { text: 'Custom-trained LLM agents', icon: Sparkles },
        { text: 'Priority server response times', icon: Gauge },

        { text: 'Dedicated priority support', icon:Headphones },
        { text: 'In-depth history analytics ', icon: BarChart3 },
        { text: 'Test new features, LLMs, and future pleasant surprises', icon: SmilePlus  }
      ]
    },
    {
      name: 'AI Research Team',
      description: 'For organizations & teams who need custom solutions.',
      url: 'https://buy.stripe.com/bIY4iM3HrfMF4Jq28a',
      callURL: 'https://calendly.com/qwksearch/30min',
      price: 99,
      features: [
        { text: 'Custom plan for API integration into your infrastructure', icon: Cog },
        { text: 'AI-led team collaboration & content discovery ', icon: Globe   },
        { text: 'LLM suggestions curated to  team dataset', icon: Target },
        { text: 'Customer metrics & search trend analysis', icon: BarChart2 },
        { text: 'Unlimited queries', icon: Infinity },
        // { text: 'Multi-user account & dataset management', icon: UserPlus  },
      ]
    }
  ];
</script>

<svelte:head>
  <title>{APP_NAME} Pricing Plans</title>
</svelte:head>
<div class=" overflow-y-auto   align-center pt-10">
  

  <div class="flex justify-center items-center w-full">
    <div class="flex items-center">
      <a href="/" class="cursor-pointer">
         <video
          src="/icons/qwksearch-video.webm"
          width="300px"
          height="auto"
          autoplay
          loop
          muted
          playsinline
          class="mx-auto"
        ></video>
        
        <!-- <img
        src="/icons/qwksearch-logo.png"
        alt="Qwk Logo"
        width="200px"
        class=" object-contain mr-6"
        /> -->
      </a>
      <div class="flex flex-col">
        <h1 class="text-2xl font-bold mb-2">{APP_NAME} </h1>
        <h3 class="text-1xl">
          {APP_SLOGAN}
        </h3>
      </div>
    </div>
  </div>
  <div class="mt-5 m-6  sm:space-y-2 sm:grid sm:grid-cols-3 sm:gap-6">

    {#each plans as plan}
      <div class="border border-slate-200 rounded-lg shadow-xs divide-y divide-slate-200  hover:shadow-xl hover:-translate-y-1 ">
        <div class="p-6">
          <h2 class="text-xl leading-6 font-bold text-slate-900">{plan.name}</h2>
          <p class="mt-2 text-base text-slate-700 leading-tight">{plan.description}</p>
          <p class="mt-8">
            <span class="text-2xl font-bold text-slate-900 tracking-tighter">${plan.price}</span>
            <span class="text-base font-medium text-slate-500">/mo</span>
          </p>
          {#if plan.url=="#"}
          <div aria-label="Subscribe"
          style="user-select: none;"
          class="mt-8 cursor-pointer	 block w-full bg-slate-900 rounded-md py-3 px-2 text-sm font-semibold text-white text-center hover:bg-slate-800 transition-colors"
        >{plan.name} Plan
      </div>
          {:else}
          <a
            target="_blank"
            href={plan.url}
            class="mt-8 cursor-pointer	 block w-full bg-slate-900 rounded-md py-3 px-2 text-sm font-semibold text-white text-center hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2"
          >
            <CreditCard class="h-5 w-5" />
            <span>{plan.name} Plan</span>
        </a>
          {/if}
          {#if plan.callURL}
          <a
          target="_blank"
          href={plan.callURL}
          class="mt-8 cursor-pointer	 block w-full bg-slate-900 rounded-md py-3 px-2 text-sm font-semibold text-white text-center hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2"
        >
            <PhoneCall class="h-5 w-5" />
            <span> Schedule Call</span>
      </a>
      {/if}

        </div>
        <div class="pt-6 pb-8 px-6">
          <h3 class="text-sm font-bold text-slate-900 tracking-wide uppercase">What's included</h3>
          <ul role="list" class="mt-4 space-y-3">
            {#each plan.features as feature}
              <li class="flex items-center space-x-3">
                <svelte:component this={feature.icon} class="shrink-0 h-5 w-5 text-blue-900" />
                <span class="text-base text-slate-700">{feature.text}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/each}
  </div>
  

</div>