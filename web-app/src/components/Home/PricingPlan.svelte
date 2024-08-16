<script>
  import { Zap, Globe, Clock, Database, Headphones, SmilePlus, BarChart3,BarChart2, Infinity, Gauge, Sparkles, Users, UserPlus, Cog, Shield, Rocket, Brain, Target, Compass, Laptop, MessageCircleQuestion } from 'lucide-svelte';

  const plans = [
    {
      name: 'Free   ',
      description: 'For individuals  exploring the power of LLM Research Agents.',
      price: 0,
      features: [
        { text: ' 100 queries / 24 hours', icon: Zap },
        { text: 'Access to cutting-edge LLMs', icon: Brain },
        { text: 'Discover curated content feed', icon: Compass },
        { text: 'Standard response times', icon: Clock },
    //    { text: 'Waiting queue during peak hours', icon: Users },
        { text: 'Community support forums', icon: MessageCircleQuestion  }
      ]
    },
    {
      name: 'AI Research Professional',
      description: 'For professionals who want custom advanced LLM  Agents.',
      price: 5,
      features: [
        { text: '1,000 queries / 24 hours', icon: Rocket },
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
      price: 19,
      features: [
        { text: 'Unlimited queries', icon: Infinity },
        { text: 'LLM suggestions curated to  team dataset', icon: Target },
        { text: 'Custom API integrations into your infrastructure', icon: Cog },
        { text: 'AI-led team collaboration & content discovery ', icon: Globe   },
        { text: 'Customer metrics & search trend analysis', icon: BarChart2 },
        { text: 'Multi-user account & dataset management', icon: UserPlus  },
      ]
    }
  ];
</script>

<div class=" overflow-y-auto h-full  sm:align-center p-10">
  <h1 class="text-2xl  align-center text-center w-full"> Searches need answers, not ads.</h1>

  <div class="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">

    {#each plans as plan}
      <div class="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200  hover:shadow-xl hover:-translate-y-1 ">
        <div class="p-6">
          <h2 class="text-xl leading-6 font-bold text-slate-900">{plan.name}</h2>
          <p class="mt-2 text-base text-slate-700 leading-tight">{plan.description}</p>
          <p class="mt-8">
            <span class="text-2xl font-bold text-slate-900 tracking-tighter">${plan.price}</span>
            <span class="text-base font-medium text-slate-500">/mo</span>
          </p>
          <div
            class="mt-8 cursor-pointer	 block w-full bg-slate-900 rounded-md py-3 px-2 text-sm font-semibold text-white text-center hover:bg-slate-800 transition-colors"
          >
            {plan.name} Plan
          </div>
        </div>
        <div class="pt-6 pb-8 px-6">
          <h3 class="text-sm font-bold text-slate-900 tracking-wide uppercase">What's included</h3>
          <ul role="list" class="mt-4 space-y-3">
            {#each plan.features as feature}
              <li class="flex items-center space-x-3">
                <svelte:component this={feature.icon} class="flex-shrink-0 h-5 w-5 text-blue-900" />
                <span class="text-base text-slate-700">{feature.text}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/each}
  </div>
</div>