<template>
  <div class="w-1/4 overscroll-contain overflow-y-auto h-screen rounded-xl pb-20 fixed flex-col justify-start items-center space-y-2">
<!--    <div class="ado ail bbi bbo bck w-full h-auto  rounded-xl bg-gray-50 ">-->
<!--      <dl class="ls yo">-->
<!--        <div class="ui atk auz">-->
<!--          <dt class="avv awb awk axq">Amount</dt>-->
<!--          <dd class="kp avt awb awk axq">$10,560.00</dd>-->
<!--        </div>-->
<!--        <div class="uj acx arf auw">-->
<!--          <dt class="t">Status</dt>-->
<!--          <dd class="adp ajc aqy ark avx avz axt bbo bbs bcn">Paid</dd>-->
<!--        </div>-->
<!--        <div class="lf ls ti uj aab afh afx arf auz">-->
<!--          <dt class="uj"><span class="t">Client</span>-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"-->
<!--                 class="nx rw axk">-->
<!--              <path fill-rule="evenodd"-->
<!--                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"-->
<!--                    clip-rule="evenodd"></path>-->
<!--            </svg>-->
<!--          </dt>-->
<!--          <dd class="avv avz awk axq">Alex Curren</dd>-->
<!--        </div>-->
<!--        <div class="lc ls ti uj aab arf">-->
<!--          <dt class="uj"><span class="t">Due date</span>-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"-->
<!--                 class="nx rw axk">-->
<!--              <path-->
<!--                  d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"></path>-->
<!--              <path fill-rule="evenodd"-->
<!--                    d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"-->
<!--                    clip-rule="evenodd"></path>-->
<!--            </svg>-->
<!--          </dt>-->
<!--          <dd class="avv awk axm">-->
<!--            <time datetime="2023-01-31">January 31, 2023</time>-->
<!--          </dd>-->
<!--        </div>-->
<!--        <div class="lc ls ti uj aab arf">-->
<!--          <dt class="uj"><span class="t">Status</span>-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"-->
<!--                 class="nx rw axk">-->
<!--              <path fill-rule="evenodd"-->
<!--                    d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"-->
<!--                    clip-rule="evenodd"></path>-->
<!--            </svg>-->
<!--          </dt>-->
<!--          <dd class="avv awk axm">Paid with MasterCard</dd>-->
<!--        </div>-->
<!--      </dl>-->
<!--      <div class="lf afh afx arf arz"><a href="#" class="avv awb awk axq">Download receipt <span-->
<!--          aria-hidden="true">→</span></a></div>-->
<!--    </div>-->


    <div class="crw w-full  bg-gray-50 p-2 text-left rounded-xl">
      <h2 class="avv awb awk axq">Activity</h2>
      <ul role="list" class="lf abt">
        <li class="ab ls aab">
          <div class="as aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <div class="ab ls nx rz uj yu yz alj">
            <div class="mz ra adn aie bbo bca"></div>
          </div>
          <p class="ui arj avx awj axm"><span class="avz axq">Chelsea Hagon</span> created the invoice.</p>
          <time datetime="2023-01-23T10:32" class="uj arj avx awj axm">7d ago</time>
        </li>
        <li class="ab ls aab">
          <div class="as aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <div class="ab ls nx rz uj yu yz alj">
            <div class="mz ra adn aie bbo bca"></div>
          </div>
          <p class="ui arj avx awj axm"><span class="avz axq">Chelsea Hagon</span> created the invoice.</p>
          <time datetime="2023-01-23T10:32" class="uj arj avx awj axm">7d ago</time>
        </li>
        <li class="ab ls aab">
          <div class="as aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <div class="ab ls nx rz uj yu yz alj">
            <div class="mz ra adn aie bbo bca"></div>
          </div>
          <p class="ui arj avx awj axm"><span class="avz axq">Chelsea Hagon</span> created the invoice.</p>
          <time datetime="2023-01-23T10:32" class="uj arj avx awj axm">7d ago</time>
        </li>
        <li class="ab ls aab">
          <div class="as aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <div class="ab ls nx rz uj yu yz alj">
            <div class="mz ra adn aie bbo bca"></div>
          </div>
          <p class="ui arj avx awj axm"><span class="avz axq">Chelsea Hagon</span> created the invoice.</p>
          <time datetime="2023-01-23T10:32" class="uj arj avx awj axm">7d ago</time>
        </li>
        <li class="ab ls aab">
          <div class="as aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <div class="ab ls nx rz uj yu yz alj">
            <div class="mz ra adn aie bbo bca"></div>
          </div>
          <p class="ui arj avx awj axm"><span class="avz axq">Chelsea Hagon</span> created the invoice.</p>
          <time datetime="2023-01-23T10:32" class="uj arj avx awj axm">7d ago</time>
        </li>
        <li class="ab ls aab">
          <div class="as aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <div class="ab ls nx rz uj yu yz alj">
            <div class="mz ra adn aie bbo bca"></div>
          </div>
          <p class="ui arj avx awj axm"><span class="avz axq">Chelsea Hagon</span> created the invoice.</p>
          <time datetime="2023-01-23T10:32" class="uj arj avx awj axm">7d ago</time>
        </li>
        <li class="ab ls aab">
          <div class="as aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <div class="ab ls nx rz uj yu yz alj">
            <div class="mz ra adn aie bbo bca"></div>
          </div>
          <p class="ui arj avx awj axm"><span class="avz axq">Chelsea Hagon</span> created the invoice.</p>
          <time datetime="2023-01-23T10:32" class="uj arj avx awj axm">7d ago</time>
        </li>
        <li class="ab ls aab">
          <div class="as aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <div class="ab ls nx rz uj yu yz alj">
            <div class="mz ra adn aie bbo bca"></div>
          </div>
          <p class="ui arj avx awj axm"><span class="avz axq">Chelsea Hagon</span> created the invoice.</p>
          <time datetime="2023-01-23T10:32" class="uj arj avx awj axm">7d ago</time>
        </li>
        <li class="ab ls aab">
          <div class="as aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <div class="ab ls nx rz uj yu yz alj">
            <div class="mz ra adn aie bbo bca"></div>
          </div>
          <p class="ui arj avx awj axm"><span class="avz axq">Chelsea Hagon</span> created the invoice.</p>
          <time datetime="2023-01-23T10:32" class="uj arj avx awj axm">7d ago</time>
        </li>
        <li class="ab ls aab">
          <div class="as aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <div class="ab ls nx rz uj yu yz alj">
            <div class="mz ra adn aie bbo bca"></div>
          </div>
          <p class="ui arj avx awj axm"><span class="avz axq">Chelsea Hagon</span> edited the invoice.</p>
          <time datetime="2023-01-23T11:03" class="uj arj avx awj axm">6d ago</time>
        </li>
        <li class="ab ls aab">
          <div class="as aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <div class="ab ls nx rz uj yu yz alj">
            <div class="mz ra adn aie bbo bca"></div>
          </div>
          <p class="ui arj avx awj axm"><span class="avz axq">Chelsea Hagon</span> sent the invoice.</p>
          <time datetime="2023-01-23T11:24" class="uj arj avx awj axm">6d ago</time>
        </li>
        <li class="ab ls aab">
          <div class="as aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <img
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
              alt="" class="ab la nx rz uj adn ail">
          <div class="ui adp aqn bbo bbs bbz">
            <div class="ls za aab">
              <div class="arj avx awj axm"><span class="avz axq">Chelsea Hagon</span> commented</div>
              <time datetime="2023-01-23T15:56" class="uj arj avx awj axm">3d ago</time>
            </div>
            <p class="avv awk axm">Called client, they reassured me the invoice would be paid by the 25th.</p></div>
        </li>
        <li class="ab ls aab">
          <div class="as aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <div class="ab ls nx rz uj yu yz alj">
            <div class="mz ra adn aie bbo bca"></div>
          </div>
          <p class="ui arj avx awj axm"><span class="avz axq">Alex Curren</span> viewed the invoice.</p>
          <time datetime="2023-01-24T09:12" class="uj arj avx awj axm">2d ago</time>
        </li>
        <li class="ab ls aab">
          <div class="nx aa cb di ls rz yz">
            <div class="tj aig"></div>
          </div>
          <div class="ab ls nx rz uj yu yz alj">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                 class="nx rz ayc">
              <path fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clip-rule="evenodd"></path>
            </svg>
          </div>
          <p class="ui arj avx awj axm"><span class="avz axq">Alex Curren</span> paid the invoice.</p>
          <time datetime="2023-01-24T09:20" class="uj arj avx awj axm">1d ago</time>
        </li>
      </ul>
      <div class="lf ls aaa"><img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
          alt="" class="nx rz uj adn ail">
        <form action="#" class="ab ui">
          <div class="adb ado asg bbi bbo bbs bca bgu bgz"><label for="comment" class="t">Add your
            comment</label><textarea rows="2" name="comment" id="comment"
                                     class="lp ti xo aev alh arl axq bfy bmx cht chv"
                                     placeholder="Add your comment..."></textarea></div>
          <div class="aa aj bx ls za arq ath atv">
            <div class="ls yu abf">
              <div class="ls yu">
                <button type="button" class="fo ls nc re yu yz adn axk bks">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                       class="nu rw">
                    <path fill-rule="evenodd"
                          d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                          clip-rule="evenodd"></path>
                  </svg>
                  <span class="t">Attach a file</span></button>
              </div>
              <div class="ls yu"><label class="t" id="headlessui-listbox-label-3" data-headlessui-state="">Your
                mood</label>
                <div class="ab">
                  <button class="ab fo ls nc re yu yz adn axk bks" id="headlessui-listbox-button-4" type="button"
                          aria-haspopup="listbox" aria-expanded="false" data-headlessui-state=""
                          aria-labelledby="headlessui-listbox-label-3 headlessui-listbox-button-4"><span
                      class="ls yu yz"><span><svg
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                      class="nu rw uk"><path fill-rule="evenodd"
                                             d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-4.464a.75.75 0 10-1.061-1.061 3.5 3.5 0 01-4.95 0 .75.75 0 00-1.06 1.06 5 5 0 007.07 0zM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5z"
                                             clip-rule="evenodd"></path></svg><span
                      class="t">Add your mood</span></span></span>
                  </button>
                </div>
              </div>
            </div>
            <button type="submit" class="adp alj aqz arl avv awb axq bbi bbo bbs bca bic">Comment</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "account"
})
</script>


<style scoped>

</style>