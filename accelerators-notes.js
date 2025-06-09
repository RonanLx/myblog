const NOTES = {
  'welcome': `
  <article>
    <h1>🌟 欢迎来到 Ronan_JoJo 的学习世界！ 🌟</h1>
    <p>这里记录了各类算法、编程与学习心得。请选择左侧笔记进行浏览。</p>
    <p>本页面持续优化中，欢迎交流指正！</p>
  </article>
`,
  'lexical-order': `
<article>
  <h1> 字典序遍历（Lexical Order）</h1>

  <h2> 一、题目描述</h2>
  <p>给定一个整数 <code>n</code>，要求按字典序返回范围 <code>[1, n]</code> 内所有整数。</p>
  <p> 你必须设计一个 <strong>时间复杂度为 O(n)</strong> 且使用 <strong>O(1) 额外空间</strong> 的算法。</p>

  <h2> 二、解题思路</h2>
  <p>这其实是<strong>十叉树的先序遍历</strong>问题：</p>
  <ul>
    <li>每个数字 <code>cur</code> 都可以扩展出下一级的子节点：<code>cur * 10, cur * 10 + 1, ..., cur * 10 + 9</code>（不能超过 n）</li>
    <li>模拟先序遍历，优先尝试下钻（<code>cur *= 10</code>），其次尝试兄弟（<code>cur++</code>），最后必要时回溯到祖先。</li>
  </ul>

  <h3> 遍历策略</h3>
  <ol>
    <li><code>cur * 10 <= n</code>：优先往下进入下一层</li>
    <li>否则如果 <code>cur % 10 != 9</code> 且 <code>cur + 1 <= n</code>：访问右兄弟</li>
    <li>否则回退（<code>cur /= 10</code>），直到找到可以 +1 的位置</li>
  </ol>

  <h2> 三、Java 实现</h2>
  <pre><code class="language-java">class Solution {
    public List&lt;Integer&gt; lexicalOrder(int n) {
        List&lt;Integer&gt; res = new ArrayList&lt;&gt;(n);
        int cur = 1;
        for (int i = 0; i &lt; n; i++) {
            res.add(cur);
            if (cur * 10 &lt;= n) {
                cur *= 10;
            } else if (cur % 10 != 9 && cur + 1 &lt;= n) {
                cur++;
            } else {
                while ((cur / 10) > 0 && (cur % 10 == 9 || cur + 1 > n)) {
                    cur /= 10;
                }
                cur++;
            }
        }
        return res;
    }
}
</code></pre>

  <h2> 四、样例分析</h2>
  <p><strong>示例 1：</strong>输入：<code>n = 13</code></p>
  <p>输出：<code>[1,10,11,12,13,2,3,4,5,6,7,8,9]</code></p>

  <h2> 五、复杂度分析</h2>
  <ul>
    <li> 时间复杂度：<code>O(n)</code>，每个数只遍历一次</li>
    <li> 空间复杂度：<code>O(1)</code>，不使用额外数据结构</li>
  </ul>

  <hr/>
</article>
`,
  'clear-stars': `
    <article>
    <h2>删除星号以后的字典序最小的字符串</h2>
    <hr>
    <h3>一、题目描述（简化版）</h3>
    <p>
    给定一个字符串 <code>s</code>，其中可能包含任意数量的 <code>*</code>。<br><br>
    <strong>操作规则如下：</strong><br>
    每次操作删除<strong>最左边</strong>的 <code>*</code> 以及该 <code>*</code> 左侧的一个<strong>字典序最小的字符</strong>。<br>
    如果有多个最小字符，<strong>可以删除其中任意一个</strong>（最优选择是<strong>最靠右的</strong>那个）。<br>
    重复上述操作直到没有 <code>*</code>，返回剩余字符串，要求字典序最小。
    </p>
    <hr>
    <h3>二、示例解析</h3>
    <b>示例 1：</b>
    <pre>
  输入：s = "aaba*"
  输出："aab"

  解释：
  原字符串为 "a", "a", "b", "a", "*"
  删除 * 及其左侧最小字符 'a'（最右边的 'a'）
  结果为："a", "a", "b"
  </pre>
  <b>示例 2：</b>
  <pre>
  输入：s = "abc"
  输出："abc"
  </pre>
  <hr>
  <h3>三、解题思路</h3>
  <b>思路 1：暴力+栈（易超时 ❌）</b>
  <ul>
    <li>用栈构造剩余字符串；</li>
    <li>每遇到 *，就<strong>线性查找</strong>栈中的最小字符，并删除它；</li>
    <li>缺点：每次查找最小字符都 O(n)，总复杂度 O(n²)。</li>
  </ul>
  <blockquote>
    ✅ 虽能通过部分测试，但会超时在极端输入下。
  </blockquote>
  <br>
  <b>思路 2：栈 + TreeMap 优化（推荐 ✅）</b>
  <p>
    为解决查找最小字符的问题，我们引入 <code>TreeMap</code>：
  </p>
  <table>
    <tr><th>结构</th><th>功能</th></tr>
    <tr>
      <td><code>List&lt;Character&gt; stack</code></td>
      <td>模拟字符构建</td>
    </tr>
    <tr>
      <td><code>TreeMap&lt;Character, Deque&lt;Integer&gt;&gt; map</code></td>
      <td>记录每个字符在栈中的索引列表，自动按字典序排序</td>
    </tr>
  </table>
  <ul>
    <li>遍历字符串 <code>s</code>：</li>
    <ul>
      <li>如果是普通字符：加入栈，同时更新 <code>map</code> 中该字符的下标列表；</li>
      <li>如果是 <code>*</code>：</li>
      <ul>
        <li>从 <code>map.firstKey()</code> 获取字典序最小字符；</li>
        <li>从该字符的下标列表中移除<strong>最后一个索引</strong>（保证剩下字符更小）；</li>
        <li>将 <code>stack</code> 对应位置设为 <code>null</code>，表示“逻辑删除”。</li>
      </ul>
    </ul>
    <li>最后遍历 <code>stack</code>，跳过 <code>null</code>，构建结果字符串。</li>
  </ul>
  <hr>
  <h3>四、Java 代码（最优版本）</h3>
  <pre>
class Solution {
    public String clearStars(String s) {
        List&lt;Character&gt; stack = new ArrayList&lt;&gt;();
        TreeMap&lt;Character, Deque&lt;Integer&gt;&gt; map = new TreeMap&lt;&gt;();

        for (char c : s.toCharArray()) {
            if (c == '*') {
                char minChar = map.firstKey();
                int idx = map.get(minChar).removeLast();
                stack.set(idx, null);
                if (map.get(minChar).isEmpty()) {
                    map.remove(minChar);
                }
            } else {
                stack.add(c);
                map.putIfAbsent(c, new ArrayDeque&lt;&gt;());
                map.get(c).add(stack.size() - 1);
            }
        }

        StringBuilder sb = new StringBuilder();
        for (Character ch : stack) {
            if (ch != null) sb.append(ch);
        }
        return sb.toString();
    }
}
  </pre>
  <hr>
  <h3>五、复杂度分析</h3>
  <table>
    <tr><th>分析项</th><th>复杂度</th><th>说明</th></tr>
    <tr>
      <td>时间复杂度</td><td>O(n × log 26) ≈ O(n)</td><td>每个字符入栈、查找、删除都 O(1)</td>
    </tr>
    <tr>
      <td>空间复杂度</td><td>O(n)</td><td>栈 + TreeMap 记录字符位置</td>
    </tr>
  </table>
  <hr>
  <h3>六、常见陷阱与错误</h3>
  <ul>
    <li>❌ <b>误删最左边的最小字符</b> → 正确逻辑是删<strong>最右边的最小字符</strong>；</li>
    <li>❌ 忽略更新 TreeMap 的清理逻辑（removeEmpty）；</li>
    <li>❌ 每次 * 都重新扫描栈，效率低。</li>
  </ul>
  <hr>
  <h3>七、总结</h3>
  <table>
    <tr><th>项目</th><th>内容</th></tr>
    <tr>
      <td>技巧点</td>
      <td>栈、TreeMap、字符位置映射</td>
    </tr>
    <tr>
      <td>核心思想</td>
      <td>构造剩余字符串时随时维护“最小可删字符”</td>
    </tr>
    <tr>
      <td>提升方向</td>
      <td>数据结构优化、模拟题的代码鲁棒性</td>
    </tr>
  </table>
</article>
`,

  'word-chain': `
<article id="1f712425-87fb-809a-b9b7-ccbd9cf18869" class="page sans">
  <header>
    <h1 class="page-title">单词接龙</h1>
  </header>
  <div class="page-body">
    <h2>一、问题描述</h2>
    <p>给定单词 <code>beginWord</code>、<code>endWord</code>，和字典 <code>wordList</code>，每次可以改变一个字符，且变换后单词必须在字典中。</p>
    <p>要求：输出<strong>所有最短从 beginWord 到 endWord 的路径</strong>。</p>
    <hr/>
    <h2>二、算法思路</h2>
    <h3>1. BFS分层建图（只保留最短路径）</h3>
    <ul>
      <li>利用 <strong>BFS</strong> 层次遍历所有变换。</li>
      <li>只保留从上层到下层的路径，构建“谁可以转化到谁”的<strong>有向无环图</strong>。</li>
      <li>只保留最短距离的转化，避免走回头路和冗余。</li>
    </ul>
    <h3>2. DFS回溯路径</h3>
    <ul>
      <li>从 <code>endWord</code> 反向回溯到 <code>beginWord</code>，收集所有可行路径。</li>
      <li>路径逆序输出即为所求。</li>
    </ul>
    <hr/>
    <h2>三、核心实现细节</h2>
    <ol>
      <li><strong>字典去重</strong>：每轮 BFS 扩展时，将本层出现的单词统一从字典移除，保证不会重复访问。</li>
      <li><strong>前驱表记录路径</strong>：用 <code>Map&lt;String, List&lt;String&gt;&gt;</code> 记录每个单词可由哪些单词变换而来，为后续 DFS 回溯服务。</li>
      <li><strong>终止条件</strong>：首次找到 <code>endWord</code> 时停止扩展，只需收集所有到达这一层的路径。</li>
    </ol>
    <hr/>
    <h2>四、复杂度分析</h2>
    <ul>
      <li><strong>时间复杂度</strong>：最坏 O(N * M^2)，N 是单词数量，M 是单词长度。</li>
      <li><strong>空间复杂度</strong>：O(N * M)，主要消耗在字典和路径存储。</li>
    </ul>
    <hr/>
    <h2>五、流程导图</h2>
    <pre>
[BeginWord]
   |
  (BFS扩展每一层)
   |
[候选单词]
   |
(构建前驱表 prev)
   |
[找到 endWord 层]
   |
(DFS回溯)
   |
[输出所有最短路径]
    </pre>
    <hr/>
    <h2>六、实现代码</h2>
    <pre><code class="language-java">class Solution {
    public List&lt;List&lt;String&gt;&gt; findLadders(String beginWord, String endWord, List&lt;String&gt; wordList) {
        Set&lt;String&gt; dict = new HashSet&lt;&gt;(wordList);
        List&lt;List&lt;String&gt;&gt; res = new ArrayList&lt;&gt;();
        if (!dict.contains(endWord)) return res;

        // 记录每个单词的前驱，便于回溯
        Map&lt;String, List&lt;String&gt;&gt; prev = new HashMap&lt;&gt;();
        Set&lt;String&gt; visited = new HashSet&lt;&gt;();
        Set&lt;String&gt; currLevel = new HashSet&lt;&gt;();
        currLevel.add(beginWord);

        boolean found = false;
        while (!currLevel.isEmpty() &amp;&amp; !found) {
            Set&lt;String&gt; nextLevel = new HashSet&lt;&gt;();
            for (String word : currLevel) dict.remove(word); // 避免走回头路
            for (String word : currLevel) {
                char[] arr = word.toCharArray();
                for (int i = 0; i &lt; arr.length; i++) {
                    char old = arr[i];
                    for (char c = 'a'; c &lt;= 'z'; c++) {
                        if (c == old) continue;
                        arr[i] = c;
                        String next = new String(arr);
                        if (dict.contains(next)) {
                            if (next.equals(endWord)) found = true;
                            nextLevel.add(next);
                            prev.computeIfAbsent(next, k -&gt; new ArrayList&lt;&gt;()).add(word);
                        }
                    }
                    arr[i] = old;
                }
            }
            currLevel = nextLevel;
        }

        // 回溯找所有路径
        if (found) {
            List&lt;String&gt; path = new LinkedList&lt;&gt;();
            path.add(endWord);
            dfs(res, prev, path, endWord, beginWord);
        }
        return res;
    }

    private void dfs(List&lt;List&lt;String&gt;&gt; res, Map&lt;String, List&lt;String&gt;&gt; prev, List&lt;String&gt; path, String curr, String beginWord) {
        if (curr.equals(beginWord)) {
            List&lt;String&gt; one = new ArrayList&lt;&gt;(path);
            Collections.reverse(one);
            res.add(one);
            return;
        }
        if (!prev.containsKey(curr)) return;
        for (String pre : prev.get(curr)) {
            path.add(pre);
            dfs(res, prev, path, pre, beginWord);
            path.remove(path.size() - 1);
        }
    }
}
    </code></pre>
    <hr/>
    <h2>八、常见陷阱</h2>
    <ul>
      <li>只记录最短层的路径，否则会超时或结果冗余。</li>
      <li>注意 beginWord 不一定在 wordList 中。</li>
      <li>字典单词需要每轮只用一次，避免环和重复。</li>
    </ul>
    <hr/>
  </div>
</article>
`,
  'largest-rectangle': `
<article id="1ec12425-87fb-8030-a5f3-eec48da3d558" class="page sans">
  <header>
    <h1 class="page-title"><strong>柱状图中最大矩形面积</strong></h1>
    <h3><strong>题目描述：</strong></h3>
    <p>给定 n 个非负整数，表示柱状图中各个柱子的高度，每个柱子彼此相邻，且宽度为 1。</p>
    <p>求能够勾勒出来的矩形的<strong>最大面积</strong>。</p>
    <hr/>
    <h3><strong>算法思路：</strong></h3>
    <p>使用<strong>单调栈</strong>来高效计算最大矩形面积。</p>
    <h3><strong>1. 单调递增栈的性质：</strong></h3>
    <ul>
      <li><strong>栈中存放下标</strong>，栈内元素对应的高度<strong>单调递增</strong>。</li>
    </ul>
    <ul>
      <li><strong>栈顶元素</strong>是<strong>当前高度序列中最小的有效高度</strong>。</li>
    </ul>
    <h3><strong>2. 计算最大面积的步骤：</strong></h3>
    <ol>
      <li>
        <strong>初始化</strong>：
        <ul>
          <li>创建一个<strong>栈</strong>，用于存放柱子的下标。</li>
        </ul>
        <ul>
          <li>在高度数组两端各加一个<strong>高度为 0</strong>的哨兵，防止越界。</li>
        </ul>
      </li>
      <li>
        <strong>遍历柱子</strong>：
        <ul>
          <li>当<strong>当前柱子的高度大于栈顶柱子的高度</strong>，入栈。</li>
        </ul>
        <ul>
          <li>
            当<strong>当前柱子的高度小于栈顶柱子的高度</strong>：
            <ul>
              <li>
                <strong>出栈</strong>，计算以出栈柱子为<strong>高</strong>的矩形面积：
                <ul>
                  <li><strong>宽度</strong> = <code>当前下标 - 栈顶下标 - 1</code>。</li>
                </ul>
                <ul>
                  <li><strong>面积</strong> = <code>高度 * 宽度</code>。</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>更新最大面积。</li>
        </ul>
      </li>
      <li>
        <strong>返回结果</strong>：
        <ul>
          <li>遍历完整个数组后，返回最大面积。</li>
        </ul>
      </li>
    </ol>
    <hr/>
    <h3><strong>代码实现：</strong></h3>
    <pre class="code"><code class="language-Java" style="white-space:pre-wrap;word-break:break-all">
import java.util.Stack;

class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int[] newHeights = new int[n + 2];
        System.arraycopy(heights, 0, newHeights, 1, n);
        newHeights[0] = newHeights[n + 1] = 0;

        Stack&lt;Integer&gt; stack = new Stack&lt;&gt;();
        int maxArea = 0;

        for (int i = 0; i &lt; newHeights.length; i++) {
            while (!stack.isEmpty() &amp;&amp; newHeights[i] &lt; newHeights[stack.peek()]) {
                int h = newHeights[stack.pop()];
                int w = i - stack.peek() - 1;
                maxArea = Math.max(maxArea, h * w);
            }
            stack.push(i);
        }

        return maxArea;
    }
}
    </code></pre>
    <hr/>
    <h3><strong>复杂度分析：</strong></h3>
    <ul>
      <li><strong>时间复杂度：O(n)</strong>
        <ul>
          <li>每个柱子最多<strong>入栈和出栈一次</strong>。</li>
        </ul>
      </li>
    </ul>
    <ul>
      <li><strong>空间复杂度：O(n)</strong>
        <ul>
          <li>额外空间主要用于<strong>栈</strong>。</li>
        </ul>
      </li>
    </ul>
    <hr/>
  </div>
</article>
  `,
  'concurrency-overview': `
<article>
  <h1>并发编程与底层并发详解</h1>

  <h2>一、并发编程 (Concurrent Programming)</h2>
  <h3>定义：</h3>
  <p><strong>并发编程</strong>指的是在程序执行过程中，多个任务或线程可以同时或交替执行，以提高程序运行效率和响应能力。</p>

  <h3>为什么使用并发？</h3>
  <ul>
    <li>提升系统吞吐量。</li>
    <li>提高资源利用率。</li>
    <li>增强用户体验（例如界面响应速度更快）。</li>
  </ul>

  <h3>常见模型：</h3>
  <ul>
    <li>多线程模型（Thread-based concurrency）</li>
    <li>异步编程模型（Async programming）</li>
    <li>Actor模型</li>
    <li>生产者-消费者模式</li>
  </ul>

  <h3>并发问题：</h3>
  <ul>
    <li><strong>竞态条件</strong>（Race Conditions）：共享资源访问冲突。</li>
    <li><strong>死锁</strong>（Deadlock）：线程互相等待，程序停滞。</li>
    <li><strong>饥饿</strong>（Starvation）：线程长期得不到资源。</li>
  </ul>

  <h3>解决机制：</h3>
  <ul>
    <li>锁（Mutex, Read-Write Lock, Spin Lock）</li>
    <li>同步原语（Semaphore, Condition, Barrier）</li>
    <li>原子操作（Atomic Operations）</li>
    <li>无锁数据结构（Lock-free）</li>
  </ul>

  <hr/>

  <h2>二、底层并发 (Low-level Concurrency)</h2>
  <h3>定义：</h3>
  <p>关注 CPU 层级的原子性、内存一致性和有序性等底层保障机制。</p>

  <h3>核心概念：</h3>
  <ul>
    <li><strong>原子性</strong>：操作不可中断（如 CAS 指令）</li>
    <li><strong>可见性</strong>：修改能否被其他线程感知（MESI 协议）</li>
    <li><strong>有序性</strong>：防止 CPU 指令乱序执行带来的逻辑错误</li>
  </ul>

  <h3>内存模型（Memory Model）：</h3>
  <p>Java内存模型（JMM）中：</p>
  <ul>
    <li><code>volatile</code> 保证可见性与禁止指令重排</li>
    <li><code>synchronized</code> 保证原子性与可见性</li>
  </ul>

  <h3>底层机制：</h3>
  <ul>
    <li><strong>CAS</strong>（Compare-And-Swap）操作</li>
    <li><strong>内存屏障</strong>（Memory Barriers）</li>
    <li><strong>指令锁定</strong>（如 x86 的 <code>lock</code> 前缀）</li>
  </ul>

  <pre><code>bool CAS(int *addr, int expected, int new_value) {
    if (*addr == expected) {
        *addr = new_value;
        return true;
    }
    return false;
}</code></pre>

  <hr/>

  <h2>三、并发工具与库支持</h2>
  <h3>Java 示例：</h3>
  <ul>
    <li><code>ExecutorService</code></li>
    <li><code>CompletableFuture</code></li>
    <li><code>CountDownLatch</code></li>
    <li><code>CyclicBarrier</code></li>
    <li><code>ConcurrentHashMap</code></li>
  </ul>

  <h3>底层库：</h3>
  <ul>
    <li>JUC（Java Util Concurrent）</li>
    <li>pthread（POSIX Threads）</li>
  </ul>

  <hr/>

  <h2>四、并发编程性能优化技巧</h2>
  <ul>
    <li>减小锁粒度</li>
    <li>使用读写锁提升并发性能</li>
    <li>避免过度共享状态</li>
    <li>使用不可变对象</li>
  </ul>

  <hr/>

  <h2>五、术语汇总</h2>
  <table>
    <thead>
      <tr><th>术语</th><th>解释</th></tr>
    </thead>
    <tbody>
      <tr><td>Race Condition</td><td>线程并发修改共享资源导致数据不一致</td></tr>
      <tr><td>Deadlock</td><td>互相持有资源造成永久等待</td></tr>
      <tr><td>CAS</td><td>原子比较并交换</td></tr>
      <tr><td>Memory Model</td><td>多线程读写内存的规则</td></tr>
      <tr><td>Lock-free</td><td>不使用锁的并发编程方式</td></tr>
      <tr><td>Thread-safe</td><td>多个线程安全地访问共享对象</td></tr>
    </tbody>
  </table>

  <hr/>

  <h2>六、最佳实践</h2>
  <ul>
    <li>优先使用线程池，不手动管理线程</li>
    <li>使用高级抽象如并发集合、同步工具</li>
    <li>保持代码简洁易测，避免同步逻辑复杂化</li>
  </ul>

  <hr/>

  <h2>七、常见应用场景</h2>
  <ul>
    <li>高并发网络服务器</li>
    <li>实时交易系统</li>
    <li>数据库事务并发控制</li>
  </ul>

  <hr/>

  <h2>总结图示</h2>
  <pre><code>
并发编程（Concurrent Programming）
├─ 基本模型
│  ├─ 多线程
│  ├─ 异步模型
│  └─ Actor模型
├─ 问题
│  ├─ 竞态条件
│  ├─ 死锁
│  └─ 饥饿
└─ 控制机制
   ├─ 锁 (Lock)
   ├─ 原子操作
   ├─ 无锁结构
   └─ 同步原语

底层并发（Low-level Concurrency）
├─ 核心概念
│  ├─ 原子性
│  ├─ 可见性
│  └─ 有序性
├─ 内存模型
│  ├─ Java内存模型 (JMM)
│  └─ 硬件模型
└─ 底层机制
   ├─ CAS操作
   ├─ 内存屏障
   └─ 指令锁定
  </code></pre>
</article>
`,
  'java-thinking-in-java': `
  <article>
    <h1>《Java 编程思想》读书随记｜比起教代码，它更像在教“思考”</h1>
    <p>最近我认真读完了《Java 编程思想》（<em>Thinking in Java</em>），作者是 <strong>Bruce Eckel</strong>，一位写 C++ 出身的大佬。</p>
    <p>一开始我以为这只是另一本 Java 教程，结果读下来发现：<strong>它讲的不只是“代码”，更多是在教你怎么“用脑子”去理解 Java 这个语言。</strong></p>
    <hr/>
    <h2>为什么我会看这本书？（其实是为了快速睡觉来着）</h2>
    <h3>1. 它不光教你怎么写，还教你“为啥要这么写”</h3>
    <p>很多入门书讲得很“工具人”，比如直接告诉你：</p>
    <blockquote>这行代码是干嘛的，照着写就行了。</blockquote>
    <p>但这本书会追问你：</p>
    <ul>
      <li>为什么 Java 要这么设计？</li>
      <li>为什么不像 C++ 一样搞指针？</li>
      <li>为啥构造器不能返回值？</li>
      <li>为什么垃圾回收是必须的？</li>
    </ul>
    <p>如果你和我一样，经常对语言背后的“逻辑”感兴趣，那你会觉得这书讲得特别透，甚至有点“哲学”。</p>

    <h3>2. 例子不复杂，但恰到好处</h3>
    <p>代码示例都不长，一屏能看完，但每一个都点到了关键。比如讲多态的时候，他用“乐器”这个例子贯穿始终，把抽象类、向上转型、接口这些概念都串起来了，超级清楚。</p>

    <h3>3. 面向对象这部分讲得特别细</h3>
    <p>如果你是培训班出来的，可能只会背“封装、继承、多态”。但这本书会告诉你这些词到底意味着什么、能怎么用来解决问题。接口、组合、设计模式这些也都讲得很系统。</p>

    <hr/>
    <h2>哪些章节我觉得特别有意思？</h2>
    <ul>
      <li><strong>多线程：</strong>讲得很清楚，尤其是 <code>wait()</code> / <code>notify()</code> 和线程死锁的例子，生动又好懂。</li>
      <li><strong>异常处理：</strong>以前觉得 try-catch 很烦，看完才知道这是在“强制”你写更安全的代码。</li>
      <li><strong>容器类：</strong>以前只知道用 <code>ArrayList</code>，读完才知道原来 <code>Vector</code> 和 <code>Hashtable</code> 是线程安全的老家伙。</li>
    </ul>

    <hr/>
    <h2>Java 和 C++ 有啥不一样？</h2>
    <p>作者是 C++ 出身，所以书里经常把 Java 和 C++ 做对比。我总结了一张表：</p>
    <table>
      <thead>
        <tr><th>特性</th><th>Java</th><th>C++</th></tr>
      </thead>
      <tbody>
        <tr><td>指针</td><td>没有，只有“安全引用”</td><td>有裸指针，容易炸</td></tr>
        <tr><td>内存回收</td><td>自动垃圾回收</td><td>要手动释放</td></tr>
        <tr><td>多继承</td><td>不支持，用接口代替</td><td>支持，但容易出菱形继承问题</td></tr>
        <tr><td>运算符重载</td><td>基本没有</td><td>支持重载，但容易滥用</td></tr>
      </tbody>
    </table>
    <p>说白了，Java 像是“帮开发者规避坑的语言”，限制多一些，但也更适合做团队协作、大项目。</p>

    <hr/>
    <h2>我的收获总结</h2>
    <ul>
      <li>“万物皆对象”不只是口号，而是 Java 的设计核心。</li>
      <li>构造器、继承、多态这些概念终于不再只是术语，而是能实际推理和使用的东西。</li>
      <li>从 Java 的设计哲学出发，我也开始更能理解 Python、Go 等语言的思路了。</li>
      <li>写代码，不只是用工具，更是理解工具为什么长这样。</li>
    </ul>

    <hr/>
    <h2>阅读建议</h2>
    <ul>
      <li>适合作为睡前读物，很安神 (￣o￣) . z Z</li>
      <li>不要硬啃一整本，分阶段读效果更好</li>
      <li>强烈建议边读边敲，配合书末的练习题理解更牢</li>
      <li>刚学完 Java 语法？这本书能帮你“打地基”</li>
      <li>适合静下心的阅读时间，不适合考前突击</li>
    </ul>
  </article>
`,
  'tree-structure': `
  <article>
    <h1>数据结构笔记：二叉树、红黑树、B树、B+树</h1>
    
    <h2>一、二叉树（Binary Tree）</h2>
    <p>每个节点最多有两个子节点。是最基础的树结构，很多高级树都由它演化而来。</p>
    <ul>
      <li><strong>满二叉树</strong>：所有非叶节点都有两个孩子，叶子都在同一层。</li>
      <li><strong>完全二叉树</strong>：只允许最底层不满，且从左往右填充。</li>
      <li><strong>二叉搜索树（BST）</strong>：左子树 &lt; 根 &lt; 右子树。</li>
      <li><strong>平衡二叉树（AVL）</strong>：左右子树高度差不超过 1。</li>
    </ul>
    <p><strong>时间复杂度（平均）：</strong> 查找/插入/删除 = O(log n)，最坏 O(n)。</p>

    <h2>二、红黑树（Red-Black Tree）</h2>
    <p>一种<strong>自平衡</strong>的二叉搜索树，每个节点有“红”或“黑”两种颜色。</p>
    <ul>
      <li>根节点是黑色</li>
      <li>红色节点不能连续</li>
      <li>从任意节点到叶子路径的黑色节点数相等</li>
      <li>插入和删除通过<strong>旋转+变色</strong>维持平衡</li>
    </ul>
    <p><strong>应用：</strong> TreeMap、TreeSet、Linux 调度器、Java 集合框架等。</p>

    <h2>三、B树（B-Tree）</h2>
    <p>一种<strong>多路平衡搜索树</strong>，用于减少磁盘 IO 的高阶结构，适合大规模索引场景。</p>
    <ul>
      <li>M 阶 B 树，每个节点最多有 M 个子节点</li>
      <li>关键字分布在所有节点中</li>
      <li>插入/删除时可能发生<strong>分裂或合并</strong></li>
    </ul>
    <p><strong>应用：</strong> 数据库索引（如 MySQL InnoDB）、文件系统。</p>

    <h2>四、B+树（B+ Tree）</h2>
    <p>B树的改进版本，是多数数据库（如 MySQL）使用的默认索引结构。</p>
    <ul>
      <li>所有数据只存在于<strong>叶子节点</strong></li>
      <li>叶子节点之间通过<strong>链表连接</strong>，支持范围查询</li>
      <li>内部节点只存索引，不存数据</li>
    </ul>
    <p><strong>优点：</strong> 查询更稳定，范围扫描性能极强，支持海量数据。</p>

    <h2>五、四者对比总结</h2>
    <table>
      <thead>
        <tr><th>结构</th><th>特点</th><th>查询效率</th><th>应用场景</th></tr>
      </thead>
      <tbody>
        <tr><td>二叉搜索树</td><td>左右分支，可能失衡</td><td>O(log n) ~ O(n)</td><td>算法基础</td></tr>
        <tr><td>红黑树</td><td>自平衡 BST，颜色控制</td><td>O(log n)</td><td>集合类/内核结构</td></tr>
        <tr><td>B树</td><td>多叉搜索树，关键字在所有节点</td><td>O(log n)</td><td>数据库索引</td></tr>
        <tr><td>B+树</td><td>叶子存数据，链表连接</td><td>O(log n)</td><td>数据库主流结构</td></tr>
      </tbody>
    </table>

    <h2>六、记忆导图结构</h2>
    <pre><code>
数据结构（树）
├── 二叉树
│   ├── 满 / 完全 / 搜索 / 平衡树
├── 红黑树（自平衡BST）
├── B树（多路搜索树）
├── B+树（叶子链表、只在叶子存数据）
    </code></pre>

    <h2>小结</h2>
    <ul>
      <li>红黑树适合内存场景（集合、调度、编译器）</li>
      <li>B/B+树适合磁盘场景（数据库、文件系统）</li>
      <li>B+树是数据库索引中的主力结构，必须掌握</li>
    </ul>
  </article>
`,
'dp-notes': `
<article>
  <h1>动态规划（Dynamic Programming）</h1>

  <h2>一、什么是动态规划？</h2>
  <p>动态规划（Dynamic Programming，简称 DP）是一种将原问题分解为子问题，并通过<strong>保存子问题结果</strong>来避免重复计算的算法思想。</p>
  <p>适用于<strong>具有重叠子问题 + 最优子结构</strong>的问题。</p>

  <h3>关键特征</h3>
  <ul>
    <li><strong>最优子结构：</strong>原问题的最优解依赖于子问题的最优解。</li>
    <li><strong>重叠子问题：</strong>子问题重复出现，可缓存结果避免重复计算。</li>
    <li><strong>状态转移方程：</strong>通过状态表示问题，用转移方程描述解法。</li>
  </ul>

  <h3>与分治的区别</h3>
  <p>分治：每个子问题独立求解；DP：子问题有重叠，适合用缓存优化。</p>

  <hr/>

  <h2>二、动态规划的解题步骤</h2>
  <ol>
    <li><strong>确定状态：</strong>明确数组 dp[i] 的含义。</li>
    <li><strong>找出转移方程：</strong>通过分析可能的选择构造递推公式。</li>
    <li><strong>设置初始状态：</strong>给 dp 数组设置起始值（边界条件）。</li>
    <li><strong>确定遍历顺序：</strong>一般从小到大递推，有时需倒序。</li>
    <li><strong>返回最终答案：</strong>根据题意选择返回 dp 的哪个值。</li>
  </ol>

  <hr/>

  <h2>三、常见动态规划分类题型</h2>

  <h3>1️⃣ 一维 DP</h3>
  <ul>
    <li>斐波那契数列：<code>dp[i] = dp[i - 1] + dp[i - 2]</code></li>
    <li>爬楼梯问题</li>
    <li>整数拆分、打家劫舍、跳跃游戏</li>
  </ul>

  <h3>2️⃣ 二维 DP</h3>
  <ul>
    <li>编辑距离</li>
    <li>最长公共子序列/子串</li>
    <li>背包问题</li>
    <li>矩阵路径问题</li>
  </ul>

  <h3>3️⃣ 状态压缩 DP</h3>
  <ul>
    <li>状压背包（位运算 + 动态规划）</li>
    <li>旅行商问题（TSP）</li>
  </ul>

  <h3>4️⃣ 区间 DP</h3>
  <ul>
    <li>戳气球</li>
    <li>石子合并</li>
    <li>矩阵连乘</li>
  </ul>

  <h3>5️⃣ 树形 DP</h3>
  <ul>
    <li>以节点为根的子树状态维护</li>
    <li>换根 DP</li>
  </ul>

  <h3>6️⃣ 记忆化搜索</h3>
  <p>使用递归 + 哈希表 / 数组缓存结果，适合题目“从顶向下”，代码简洁。</p>

  <hr/>

  <h2>四、常用动态规划模板</h2>

  <h3>一维 DP（以爬楼梯为例）</h3>
  <pre><code class="language-java">
int climbStairs(int n) {
    if (n <= 2) return n;
    int[] dp = new int[n + 1];
    dp[1] = 1; dp[2] = 2;
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
  </code></pre>

  <h3>0-1 背包问题</h3>
  <pre><code class="language-java">
int n = weights.length, W = bagCapacity;
int[] dp = new int[W + 1];
for (int i = 0; i < n; i++) {
    for (int j = W; j >= weights[i]; j--) {
        dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i]);
    }
}
  </code></pre>

  <h3>编辑距离</h3>
  <pre><code class="language-java">
int m = word1.length(), n = word2.length();
int[][] dp = new int[m + 1][n + 1];
for (int i = 0; i <= m; i++) dp[i][0] = i;
for (int j = 0; j <= n; j++) dp[0][j] = j;

for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
            dp[i][j] = dp[i - 1][j - 1];
        } else {
            dp[i][j] = Math.min(dp[i - 1][j], Math.min(dp[i][j - 1], dp[i - 1][j - 1])) + 1;
        }
    }
}
  </code></pre>

  <hr/>

  <h2>思维导图结构建议</h2>
  <pre><code>
动态规划
├── 一维 DP（打家劫舍、爬楼梯）
├── 二维 DP（编辑距离、LCS）
├── 状压 DP（旅行商、集合覆盖）
├── 区间 DP（戳气球、石子合并）
├── 树形 DP（换根、以子树为状态）
├── 记忆化搜索（DFS + 备忘录）
  </code></pre>

  <hr/>
</article>
`,
'stock-max-2-transactions': `
<article>
  <h1>最多两笔交易的股票买卖问题</h1>

  <h2>题目概述</h2>
  <ul>
    <li>给定一个整数数组 <code>prices</code>，其中 <code>prices[i]</code> 表示第 <code>i</code> 天的股票价格。</li>
    <li>最多只能完成<strong>两笔不重叠的交易</strong>（一次买入+一次卖出）。</li>
    <li>求可获得的最大利润。</li>
  </ul>

  <h2>解题思路</h2>

  <h3>1️⃣ 状态定义</h3>
  <ul>
    <li><code>dp[i][k][0]</code>：第 <code>i</code> 天，最多还能进行 <code>k</code> 次交易，<strong>当前未持股</strong> 的最大利润。</li>
    <li><code>dp[i][k][1]</code>：第 <code>i</code> 天，最多还能进行 <code>k</code> 次交易，<strong>当前持股</strong> 的最大利润。</li>
  </ul>

  <h3>2️⃣ 状态转移方程</h3>
  <ul>
    <li>不持股：<code>dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])</code></li>
    <li>持有股：<code>dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])</code></li>
  </ul>

  <h3>3️⃣ 初始化</h3>
  <ul>
    <li><code>dp[0][k][0] = 0</code>（第0天未持股）</li>
    <li><code>dp[0][k][1] = -prices[0]</code>（第0天买入）</li>
  </ul>

  <h3>4️⃣ 最终答案</h3>
  <p>返回 <code>dp[n - 1][2][0]</code>，表示最后一天，最多进行两笔交易且不持股的最大利润。</p>

  <h2>思维导图结构</h2>
  <pre><code>
最多两笔交易股票买卖
├─ 状态定义：dp[i][k][0/1]
│    ├─ i: 第i天，k: 剩余交易次数
│    ├─ 0: 未持股，1: 持股
├─ 状态转移
│    ├─ 未持股: max(昨天未持股, 昨天持股+今天卖)
│    └─ 持股: max(昨天持股, 昨天未持股-今天买入)
├─ 初始化
│    ├─ dp[0][k][0]=0
│    └─ dp[0][k][1]=-prices[0]
├─ 最终答案：dp[n-1][2][0]
└─ 时间复杂度：O(n)
  </code></pre>

  <h2>Java 代码实现</h2>
  <pre><code class="language-java">
class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        if (n == 0) return 0;
        int[][][] dp = new int[n][3][2];
        for (int k = 0; k <= 2; k++) {
            dp[0][k][0] = 0;
            dp[0][k][1] = -prices[0];
        }
        for (int i = 1; i < n; i++) {
            for (int k = 2; k > 0; k--) {
                dp[i][k][0] = Math.max(dp[i-1][k][0], dp[i-1][k][1] + prices[i]);
                dp[i][k][1] = Math.max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i]);
            }
        }
        return dp[n-1][2][0];
    }
}
  </code></pre>

  <h2>复杂度分析</h2>
  <ul>
    <li><strong>时间复杂度：</strong>O(n)，k 固定为 2</li>
    <li><strong>空间复杂度：</strong>O(n)，可优化为 O(1)</li>
  </ul>

  <h2>边界情况</h2>
  <ul>
    <li>价格单调递减：利润为 0</li>
    <li>价格波动仅允许一次交易：等价于最大差值</li>
    <li>两次高低点组合：需注意交易间不能重叠</li>
  </ul>
</article>
`,
 'kth-lexical-number': `
<article>
  <h1>字典序第 k 小的数字</h1>

  <h2>一、题目描述</h2>
  <p>给定整数 <code>n</code> 和 <code>k</code>，返回 [1, n] 中字典序第 k 小的数字。</p>
  
  <pre><code>示例 1:
输入: n = 13, k = 2
输出: 10
解释: 字典序：[1,10,11,12,13,2,3,4,5,6,7,8,9]

示例 2:
输入: n = 1, k = 1
输出: 1</code></pre>

  <hr/>

  <h2>二、解题思路</h2>

  <h3>1. 字典树结构</h3>
  <p>将所有数字看作字典序遍历的 10 叉树：</p>
  <ul>
    <li>每个数字 prefix，子节点为 prefix*10 ~ prefix*10+9</li>
    <li>遍历这棵树的前 k 个节点</li>
  </ul>

  <h3>2. 步进跳跃策略</h3>
  <p>用一个函数 getCount(prefix, n) 表示在 [1, n] 范围内，以 prefix 为起点的所有字典序子节点个数。</p>

  <p>算法策略如下：</p>
  <ul>
    <li>从 curr = 1 开始</li>
    <li>若 getCount(curr, n) ≤ k：说明 k 在 curr 的兄弟节点中，curr++，k -= count</li>
    <li>否则：说明 k 在 curr 的子树中，curr *= 10，k--</li>
    <li>重复直到 k = 0，返回 curr</li>
  </ul>

  <hr/>

  <h2>三、代码实现（JavaScript）</h2>
  <pre><code class="language-js">var findKthNumber = function(n, k) {
    let curr = 1;
    k = k - 1;

    while (k > 0) {
        let steps = getSteps(n, curr, curr + 1);
        if (steps <= k) {
            curr += 1;
            k -= steps;
        } else {
            curr *= 10;
            k -= 1;
        }
    }
    return curr;
};

function getSteps(n, curr, next) {
    let steps = 0;
    while (curr <= n) {
        steps += Math.min(n + 1, next) - curr;
        curr *= 10;
        next *= 10;
    }
    return steps;
}</code></pre>

  <hr/>

  <h2>四、复杂度分析</h2>
  <ul>
    <li>时间复杂度：<strong>O(log<sub>10</sub>(n) × log<sub>10</sub>(n))</strong>，每次跳转最多 log 层</li>
    <li>空间复杂度：<strong>O(1)</strong></li>
  </ul>

  <hr/>

  <h2>五、可视化理解</h2>
  <p>以 n = 13 为例，其字典树如下：</p>
  <pre>
1
├── 10
│   ├── 100 (超出 n，跳过)
│   └── ...
├── 11
├── 12
├── 13
└── 2 ...
  </pre>
  <p>第 k=2 小的数字即为：10</p>

</article>
`,
'two-pointers': `
<article>
  <h1>双指针（Two Pointers）详解笔记</h1>

  <h2>一、概念理解</h2>
  <p><strong>双指针</strong>是一种在有序结构（数组、字符串、链表）中常用的技巧，通过两个指针在不同方向上移动，实现高效遍历与处理。</p>

  <p>核心思想：</p>
  <ul>
    <li>用两个变量（通常是索引）控制遍历过程</li>
    <li>指针之间形成滑动窗口，动态更新状态</li>
  </ul>

  <hr/>

  <h2>二、常见应用场景</h2>
  <ul>
    <li>有序数组中的两数之和（对撞指针）</li>
    <li>移除元素/快慢指针（覆盖式处理）</li>
    <li>滑动窗口求最值/最短子串/区间统计</li>
    <li>字符串匹配/回文判断/压缩处理</li>
    <li>链表快慢指针（找中点/是否有环）</li>
  </ul>

  <hr/>

  <h2>三、分类与模板</h2>

  <h3>1. 对撞指针（左右夹逼）</h3>
  <p>用于有序数组/字符串，两端向中间收缩</p>
  <pre><code class="language-js">// 示例：两数之和
function twoSumSorted(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left &lt; right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    else if (sum &lt; target) left++;
    else right--;
  }
  return [-1, -1];
}
</code></pre>

  <h3>2. 快慢指针（覆盖处理）</h3>
  <p>常用于原地修改数组（如移除元素、数组去重）</p>
  <pre><code class="language-js">// 示例：移除指定元素
function removeElement(nums, val) {
  let slow = 0;
  for (let fast = 0; fast &lt; nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow++] = nums[fast];
    }
  }
  return slow;
}
</code></pre>

  <h3>3. 滑动窗口（变长区间）</h3>
  <p>维护一段区间，同时移动左右指针解决最小覆盖子串、最长不重复子串等</p>
  <pre><code class="language-js">// 示例：无重复字符的最长子串
function lengthOfLongestSubstring(s) {
  let map = new Map(), left = 0, maxLen = 0;
  for (let right = 0; right &lt; s.length; right++) {
    if (map.has(s[right]) && map.get(s[right]) &gt;= left) {
      left = map.get(s[right]) + 1;
    }
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
</code></pre>

  <h3>4. 链表快慢指针</h3>
  <p>用于判断链表是否有环、找中间节点等</p>
  <pre><code class="language-js">// 示例：判断链表是否有环
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast &amp;&amp; fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
</code></pre>

  <h2>四、复杂度分析</h2>
  <ul>
    <li>时间复杂度：通常为 <code>O(n)</code>，每个指针最多移动一次</li>
    <li>空间复杂度：<code>O(1)</code> 或 <code>O(k)</code>（滑动窗口中用哈希表）</li>
  </ul>

  <hr/>

  <h2>五、总结口诀</h2>
  <blockquote>
    对撞夹逼解排序，快慢同步移覆盖，<br/>
    滑窗左右维区间，链表探环别落败。
  </blockquote>

</article>
`
}

