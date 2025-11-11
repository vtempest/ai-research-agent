import "clsx";
import { l as ensure_array_like, h as head, g as escape_html, j as attr } from "../../../chunks/index.js";
import { A as APP_NAME, b as APP_SLOGAN } from "../../../chunks/customize-site.js";
import { B as Brain, C as Compass, a as Clock, M as Message_circle_question_mark, D as Database, S as Sparkles, G as Gauge, H as Headphones, b as Chart_column, c as Smile_plus, d as Cog, e as Globe, T as Target, f as Chart_no_axes_column, I as Infinity, g as Credit_card, P as Phone_call } from "../../../chunks/Footer.svelte_svelte_type_style_lang.js";
function PricingPlan($$payload) {
  const plans = [
    {
      name: "Free ",
      description: "For individuals  exploring the power of AI Research Agents.",
      url: "#",
      price: 0,
      features: [
        // { text: ' 100 queries / 24 hours', icon: Zap },
        { text: "Access to cutting-edge LLMs", icon: Brain },
        { text: "Discover curated content feed", icon: Compass },
        { text: "Standard response times", icon: Clock },
        {
          text: "Community support forums",
          icon: Message_circle_question_mark
        }
      ]
    },
    {
      name: "AI Research Professional",
      description: "For professionals who want custom advanced AI Agents.",
      url: "https://buy.stripe.com/8wMdTmdi1asl1xe3cc",
      price: 5,
      features: [
        // { text: '1,000 queries / 24 hours', icon: Rocket },
        { text: "Custom dataset integration", icon: Database },
        { text: "Custom-trained LLM agents", icon: Sparkles },
        { text: "Priority server response times", icon: Gauge },
        { text: "Dedicated priority support", icon: Headphones },
        { text: "In-depth history analytics ", icon: Chart_column },
        {
          text: "Test new features, LLMs, and future pleasant surprises",
          icon: Smile_plus
        }
      ]
    },
    {
      name: "AI Research Team",
      description: "For organizations & teams who need custom solutions.",
      url: "https://buy.stripe.com/bIY4iM3HrfMF4Jq28a",
      callURL: "https://calendly.com/qwksearch/30min",
      price: 99,
      features: [
        {
          text: "Custom plan for API integration into your infrastructure",
          icon: Cog
        },
        {
          text: "AI-led team collaboration & content discovery ",
          icon: Globe
        },
        {
          text: "LLM suggestions curated to  team dataset",
          icon: Target
        },
        {
          text: "Customer metrics & search trend analysis",
          icon: Chart_no_axes_column
        },
        { text: "Unlimited queries", icon: Infinity }
        // { text: 'Multi-user account & dataset management', icon: UserPlus  },
      ]
    }
  ];
  const each_array = ensure_array_like(plans);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(APP_NAME)} Pricing Plans</title>`;
  });
  $$payload.out.push(`<div class="overflow-y-auto align-center pt-10"><div class="flex justify-center items-center w-full"><div class="flex items-center"><a href="/" class="cursor-pointer"><img src="/icons/qwksearch-logo.png" alt="Qwk Logo" width="200px" class="object-contain mr-6"/></a> <div class="flex flex-col"><h1 class="text-2xl font-bold mb-2">${escape_html(APP_NAME)}</h1> <h3 class="text-1xl">${escape_html(APP_SLOGAN)}</h3></div></div></div> <div class="mt-5 m-6 sm:space-y-2 sm:grid sm:grid-cols-3 sm:gap-6"><!--[-->`);
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let plan = each_array[$$index_1];
    const each_array_1 = ensure_array_like(plan.features);
    $$payload.out.push(`<div class="border border-slate-200 rounded-lg shadow-xs divide-y divide-slate-200 hover:shadow-xl hover:-translate-y-1"><div class="p-6"><h2 class="text-xl leading-6 font-bold text-slate-900">${escape_html(plan.name)}</h2> <p class="mt-2 text-base text-slate-700 leading-tight">${escape_html(plan.description)}</p> <p class="mt-8"><span class="text-2xl font-bold text-slate-900 tracking-tighter">$${escape_html(plan.price)}</span> <span class="text-base font-medium text-slate-500">/mo</span></p> `);
    if (plan.url == "#") {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<div aria-label="Subscribe" style="user-select: none;" class="mt-8 cursor-pointer block w-full bg-slate-900 rounded-md py-3 px-2 text-sm font-semibold text-white text-center hover:bg-slate-800 transition-colors">${escape_html(plan.name)} Plan</div>`);
    } else {
      $$payload.out.push("<!--[!-->");
      $$payload.out.push(`<a target="_blank"${attr("href", plan.url)} class="mt-8 cursor-pointer block w-full bg-slate-900 rounded-md py-3 px-2 text-sm font-semibold text-white text-center hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2">`);
      Credit_card($$payload, { class: "h-5 w-5" });
      $$payload.out.push(`<!----> <span>${escape_html(plan.name)} Plan</span></a>`);
    }
    $$payload.out.push(`<!--]--> `);
    if (plan.callURL) {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<a target="_blank"${attr("href", plan.callURL)} class="mt-8 cursor-pointer block w-full bg-slate-900 rounded-md py-3 px-2 text-sm font-semibold text-white text-center hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2">`);
      Phone_call($$payload, { class: "h-5 w-5" });
      $$payload.out.push(`<!----> <span>Schedule Call</span></a>`);
    } else {
      $$payload.out.push("<!--[!-->");
    }
    $$payload.out.push(`<!--]--></div> <div class="pt-6 pb-8 px-6"><h3 class="text-sm font-bold text-slate-900 tracking-wide uppercase">What's included</h3> <ul role="list" class="mt-4 space-y-3"><!--[-->`);
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let feature = each_array_1[$$index];
      $$payload.out.push(`<li class="flex items-center space-x-3"><!---->`);
      feature.icon?.($$payload, { class: "shrink-0 h-5 w-5 text-blue-900" });
      $$payload.out.push(`<!----> <span class="text-base text-slate-700">${escape_html(feature.text)}</span></li>`);
    }
    $$payload.out.push(`<!--]--></ul></div></div>`);
  }
  $$payload.out.push(`<!--]--></div></div>`);
}
function _page($$payload) {
  $$payload.out.push(`<main class="relative mb-2 h-screen">`);
  PricingPlan($$payload);
  $$payload.out.push(`<!----></main>`);
}
export {
  _page as default
};
