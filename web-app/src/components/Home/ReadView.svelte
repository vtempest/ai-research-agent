<script>
  import { onMount } from "svelte";
  import Footer from "./Footer.svelte";

  import iconQwkLogo from "$lib/icons/qwk-logo.svg"
  
  export let selectedArticle = null;

</script> 

<div class="article-container read-view h-full overflow-y-auto p-3" >
  {#if selectedArticle && selectedArticle.html}
    <h1 class="text-3xl font-bold mb-4">{selectedArticle.title || ""}</h1>
    <p class="text-sm text-gray-500 mb-0">{selectedArticle.author_cite || ""}</p>
    <p class="text-sm text-gray-500 mb-0"> {selectedArticle.source || ""}</p>
    <p class="text-sm text-gray-500 mb-0">{selectedArticle.date || ""}</p>
    <p class="text-sm text-gray-500 mb-0">{selectedArticle.word_count || ""} words</p>
    <p class="text-sm text-gray-500 mb-0">
      <a href="{selectedArticle.url || ''}" target="_blank" rel="noopener noreferrer">
        {selectedArticle.url || ""}
      </a>
    </p>
    <div class="article prose prose-sm max-w-none">
      {@html selectedArticle.html}
    </div>
  {:else}
    <div class="relative h-full text-lg text-gray-500 text-center ">
      <h3 class="text-xl text-gray-500 text-center">
        <img src={iconQwkLogo} alt="Qwk Logo" width="200px" 
        class="text-lg text-gray-500 mx-auto block mb-0" 
        />
          Whatever the future of research can be, 
        <br />that is what it must become. 
      </h3>
      <p class="text-lg text-gray-500 text-center ">
        <!-- Use WASD to scroll and navigate. -->
      </p>
         <p class="text-lg text-gray-500 text-center  justify-center">
          <a  class="text-lg text-gray-500 text-center justify-center " target="_blank" href="https://chromewebstore.google.com/detail/tab-manager-ai/manhemnhmipdhdpabojcplebckhckeko" >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM4AAAA6CAYAAAD4HGbLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ
                  bWFnZVJlYWR5ccllPAAADQ1JREFUeNrsXWtsm1cZfr/cLyt1L0GwtoqzMqZeRB1ULuIHdRBIdGPU
                  0bQfSEhNgB9InZRY8IOLUJo//ENJqqpiYsUOg/1YQXEmuhUExClsP1ZG3Yl12latbquEam0Wp22c
                  my+c13lP8vb4sz/bcVu3fR/p0/f5fOf2fX6f817OOTaAQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQ
                  CASChxdWqQUnJibG1MlbSN50Ol2Wzq6lnm3btlnydQvKhZpSC1ZVVRUs1JZllYUopdYjEJQbVfIK
                  BIK7qHHWakKlUilIJpMF1Y2apqamRr4twYNBnFJ9jqWlpVgykRiqrq4OF+KEpZJJ92IyOVBXX++S
                  r0xwXxNnLY66IkL/Y9u3DxZT5lI0GlNtjoifI3hgTLVisd7lihZbxrVhQ/TWrVt3tZ8Hv/9Dtzq5
                  h4//Olxiea86RbD7eKh6IjnyedQppu5HjXQs5ymk/Vx1FNNPVTYmlKjg4EAikeibmZlxF5pf5XUt
                  Li4G7kFXB9QxRkJZCukwZN+rji6qK187XTbpHqqjEIyoI1Bo39RxmCWNUVuCStY4ijieZDJ58erV
                  qwWZgfF4PBNMuAfaxkcfe9TRXUx5HPlVHR2kcXrvQpc7UeMUmBefrU8dh4UC9xFxNDly+UnlmjBd
                  I1ADoNnTjxpBkcBPBGhVpOgmcmGeAzoPLE8II1G6ySxD4fQbptcAERKFfFjl08K7R90/S0Id4uWo
                  rI/q8+j7hll2UB3nVL4ItRGjdtDM69RmGGnPAboeY+0cVJ+1xupX+YOUt4/qiVB6SGhTgfM4FUIa
                  LYghOlxMeLpIG2lNFKMz5ukgsmnzykvpwD77SFiHUSiZGYjpo3TPx007ai9A7XcSuQI2Zp2b2vNS
                  vzopnZuJMaoHMc60lO5XmNUdoDq15gwQ+YU48gpyOstaCHuJDAdptMXrHhJ4PIboiNLo7DbIwhEm
                  IiIp9zGBRQRR++BITwLMfR4f1ekmkmoS5jMVu6m/Q1RuxYQk0gK1F2VaJkTaE99BL/N7+HOJL1Rp
                  xKkwbRMjYdlH114a+YdIkHsoEhUhDeMmoRt1CAL4GNlihiawuwYS2BhpiHFqo7/MzxxhxAJG/ghr
                  t58GCPFx5BVkaRttluEIPMjSp0kLDLIoWDcTsjAJWV+e6jUBwlSeayY0AUeZ5gqzeyFKw7JBat9d
                  hmf1Ge2Y2lFrt0Hqbw+1LxpHtE0WtFlkOsEhMte08MbIrAIaidG0mXYQ6H6qe5qIwEdv7RtdpM9+
                  Zl5FiKQDVNanza01aBc8RsA+DK7RQW1NU9uhUuaJHkSUPA0/OTlZ8LaCSiDNli1bZMmB4P431ZJX
                  LsHSubdg6b3zkLx+HVJT15BCq4xubILqba1QvbUVap/YAbWevfJtCR5OjZOOx2HhH6dg4Y1/ElFM
                  bZPWKigrCYlU95WvQsM39kPVppaiNdrWrVtF4wjuPXGK2QGKmD85AvN/OwXpuXgWOdK3kca8BiN/
                  Ghq+/iQ0PP0MWE1NBRNHdoAKKoI4U1NTBREncfkizAaeh+TEZUOLpO0k3DZP2ryX0UCNsO7Qj6Fm
                  x+6C/KeWlhYhjuDeE2d6etqROAv/CkP8pYAy0WbtyWGqFRsT7XZzLjtv03d/AA3ffNqxvxs3bizq
                  WdlatQOUhNG0UR1Jo0lSPIKVHmmiEDtG/cIFrrTWzzaYb8U0LRQNF7p6nOrVqyyw3qFSV57fa9yx
                  cDSSZvaFo6ukQUHP8mfWRhpE/MXfwOzzQ+UWtC51wnVjfL4ESYRLTs6SIKIQ9EEZ5lPuNEj4eyD/
                  Cm0OfK6eArYZ9BVqrtOc0RisrpTIfKb0lRXbbDnTw0ccTRp7wtiYaY6kyZV3+Xrh9N9h/rVXykUa
                  FAS9VqtDCU+bOnA+YwMsz8O4IfeSmkoGzkN5+FozHCDUkVaHSSh8B+XWBHpdXzu9zzb6rDW6+34Z
                  iBBlD0cnL0eVefZbG7I4ECYvaZz9ofiLL0CN+zFHn6fA0VaTJmKM2jgiZswXdTZH08yqZV2Gb4Ij
                  MiIiVNYDqyukVyYVdRlYnpz00XWQtii42Wh920Qk3fNS/lCODXO4ZKaL8unJ3QNs9PezgUPn5ysp
                  3NT/UB6zNqtvDBnzTPeNnqmdPZteA4fkBm3CMe3uofcSNlZ6azPares3+hy+E+Zg2X2ct371U2h7
                  +/38hCmVNDbaht/GKJvryHF1bi7Jx6Ev8CIJa7dD3sOwugyGayAklp/djzChaCNtZr63blrGb1cG
                  EYTbZ/j1yB0l0gaMPoRpVLd7Nt0/vYJB97+dhE73oY3Sx4y6IzSo4ACQtukr1udnqyp0+wPazyLf
                  JmTzLrl5aRExzPaRlJ3UV74Bz0XvacimTBjY1oqKM9V+/+Fp+MnW2dx+jJ3pll4DaQzmoT8196eX
                  1vII2ky4VESZKAlZG133Gkvv8RqX97eTueKlLxhNP75c31x13Eb3gUgTZOYi1tlF7QRIWLU5ifm8
                  tLqZC2KUaTJgZ71Y9CDTQlHKH2DEtkgrmdsUPFTHBtbfAXP7AZIVlte84fOP4No/tgs1CKtLjPys
                  nhGb9t0sXb/fMJXRpAH2PnSbZd1MWDZT7ebSHBx7/y9wo6kGTjy+Dp794EZ+DUO8QO1Qv/fLULtz
                  N1Rv/uRyemoWqufegdrZM2AlruUmkK0mOwWLCR+kalrgLqGfmVrDsLrZTMOvR1caISNMm6EZ102B
                  CJ+hgbBO1CgoFB5WBs3FPib8WnB0JOwSI4D5gyhhIrab7qNpM6g+I2l86txPfQ+ybRNINr7VOkrt
                  djPtdpg9j58I5wNjQShpun66h8+A+5H2qPRO2oCnzdkw29rRr7UX9bWVnkG/YyR5JzMzzfcxQ/n2
                  VSRxQlfOwA1FHkRgpwv2R2/BI0upnIRBND/zHWjc/+0s02pZ63wJEvA9qJs5CfXTJ8BSZFquy2KV
                  WLaapzr2MsxuPlRK9ClMvksxLzlWxH0XrG4i021GWJvjOs2oI+KgIX0G8XJhlEZenyHYw6RFepl/
                  42IaJd8enHEbDQy5nHy2SDZIA4nPIZIWzvEMLqM9YCaw18Yc9lQkcUavvKkNJrhZa8GRPRvgZ2eu
                  2xIGieL6xS+hprUNrt0EODFmwflJC66RkmquB9jrTsO+J9Kw89GnINm4Cxo+OgrVC9Hcmoal18ax
                  L4dKfZQgmUFdpp1Oo1ovlL60PmZ+gUxoxkuoT7+QTsNn8NgFCNjA0MeEkAtnH4vAubnPlqfufTnI
                  zIMX2lcZYtpJP7PXIZJmRvgOOJCsT/uM/B2Xe66tLD7ORPxjePfGRIY0Gq+5H4EPXHW2fsz6H/08
                  Q5rx9yx47g9VmfM1ZtnNLqg3oNL6X6mC4derIFnnhvmW5yBd1exImgwxlXZaJk9J8JOAB2hewaMj
                  ZzRCDkD+PTdOpMSoUWYLMpFmJMfIWmiIWffVy4h91vRxjDI6whViGi7KI38srYvmtbQpNMZ+mwC0
                  P0XP44XV3zsIca1KaX0sr94MGDOiXri71ktpUfqs2+8ify+aI1Km2xkw3sdF41d9KoM4Z6YuZJla
                  eKDWMeW8SZlntTt2Z8hyTGmarOCAQY2Tb1sQRPLUu2Fh47OOpFnROvPvlPQsZEq0s9HrLEWPRmB1
                  Nt1fqj8Eq5vYpinK5aERMlxiX3VfxqifAyRAQQfTym6/kUngTjoHqG7teA8Zwqr3Celolt8mgtVJ
                  RNB5R9hApcPPOngxRoJvth8w+mX3PjpzvI/BchKnLKbam9cv2E5Wnm1pgFeV5nlS+Tv6fpPyaVCj
                  DL9uZQfcckSsX1Xk+UKbBbse/RbUxU5CVeKjvKRBVC+WrplJrXeQttEOZ5Qc4SjTHmHD/+BpUfM+
                  fbEdbN4nZsx7BG00jx1J9Y+CAIWxwyxQEHH4JZog659J6lGeTv5XG5sTiVJ/Y0Y/9LyJ+TxgaJ02
                  9uxmXZinnc0jRSncnq99fw5z9LYydib3WlGWeZyuN45myGNHgk/PJiDw18lMoACjZ2imnThjwR//
                  bTkSht/3Kn/n0NdS0HA9AHUzf85PHNR4yqyLtf5u5U6xa9UEgjtuqmE0Lc3MLC7K/2uugZc/+4lM
                  Kvo1qHnOT0JRpMmYg9FluU807nLUNtrPEQgqjjj8LzrenZmw9zzI1zm+c32GQCuhoCkri2AO86Iw
                  O6973GxzN//kaCF/JyIQ3BXiLC4uZhHEPDiO7NmYMyKWdvB1IO9PEjitKMj8rYh804LKIM7c3Nx4
                  IpHIXH9x82ccBDsNp7c0wn9aGjIprZvSKxomn5bhCS3ryATLFRjI83O6qq9B+aoF5UTJUbXt27cf
                  vnDhwvq6urre1PwSWItJJ9UAxxY/hM/H4/C5T1nw30tVK7Lv9Bs3yInHFdni8RQ0fHwOUnOpHORZ
                  vUzVbAL8W5CFhYVgKpXyy1ctEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAICgP/i/AAIy/rys7
                  E0YdAAAAAElFTkSuQmCC" alt="Chrome Web Store" class="h-12 mx-auto" />
      </a>
    </p>

      <div class="absolute bottom-0 w-full text-center  text-slate-500 text-xs z-20">

        <Footer />
      </div>
    </div>
    {/if}
</div>

<style>

  .article {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  :global(.article p) {
    margin-top: 16px;
  }

  :global(.article a) {
    color: #3a3c3f;
    font-weight: 500;
    text-decoration: underline 1px;
  }

  /* Optional: Add some additional styles to take advantage of the new fonts */
  :global(h1, h2, h3, h4, h5, h6) {
    font-weight: 700;
  }

  
  :global(li *) {
    display: inline;
  }



  :global(.article img) {
    max-width: 96%;
    display: block;
    height: auto;
  }
</style>