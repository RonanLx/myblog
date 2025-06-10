const NOTES = {
  'welcome': `
  <article>
    <h1>🌟 Welcome to Ronan_JoJo's learning world! 🌟</h1>
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
`,
  'javase-collection-basic': `
<article>
  <header>
    <h1>JavaSE基础 &amp; 集合框架底层原理</h1>
  </header>
  <div class="page-body">

    <h2>一、JavaSE 基础知识</h2>
    <h3>1. Java 基础语法与特性</h3>
    <ul>
      <li><strong>数据类型：</strong> 基本类型（byte, short, int, long, float, double, char, boolean）和引用类型（类、接口、数组、String）。</li>
      <li><strong>OOP 特性：</strong> 封装、继承、多态、抽象（接口和抽象类）。</li>
      <li><strong>常见关键字：</strong> <code>static</code>（静态成员）、<code>final</code>（常量、不可重写/继承）、<code>this</code>（当前对象）、<code>super</code>（父类引用）。</li>
      <li><strong>包机制：</strong> 使用 <code>package</code> 组织代码，<code>import</code> 引入其他包的类。</li>
      <li><strong>异常处理：</strong> <code>try-catch-finally</code>，自定义异常，受检/非受检异常。</li>
      <li><strong>常用类：</strong> String、Math、System、包装类（如 Integer）、Object。</li>
    </ul>

    <h3>2. 内存模型与垃圾回收</h3>
    <ul>
      <li><strong>内存结构：</strong> 方法区、堆（对象/实例）、栈（方法调用、局部变量）、本地方法栈、程序计数器。</li>
      <li><strong>GC算法：</strong> 标记-清除、复制、标记-整理、分代收集等。</li>
      <li><strong>常见内存泄漏原因：</strong> 静态集合类引用、未关闭资源、Listener未注销等。</li>
    </ul>

    <h2>二、Java集合框架底层原理</h2>

    <h3>1. 集合体系结构图</h3>
    <ul>
      <li><strong>Collection</strong>：单列集合的根接口（List、Set）</li>
      <li><strong>Map</strong>：双列集合的根接口（键值对）</li>
      <li>
        <img src="https://img-blog.csdnimg.cn/20200508154258559.png" alt="集合体系结构图" style="max-width: 480px;">
      </li>
    </ul>

    <h3>2. List 接口与实现类</h3>
    <ul>
      <li><strong>ArrayList：</strong> 底层为<strong>动态数组</strong>，默认容量 10，扩容为原容量的 1.5 倍。查找快（O(1)），增删慢（O(n)）。线程不安全，允许null。</li>
      <li><strong>LinkedList：</strong> 底层为<strong>双向链表</strong>，增删快（O(1)），查找慢（O(n)）。可做队列/栈。允许null。</li>
      <li><strong>Vector：</strong> 底层也是动态数组，方法带 <code>synchronized</code>，线程安全但性能差。</li>
    </ul>

    <h3>3. Set 接口与实现类</h3>
    <ul>
      <li><strong>HashSet：</strong> 基于 <strong>HashMap</strong> 实现。底层用数组 + 链表/红黑树（JDK8后），无序、不重复，允许 null。</li>
      <li><strong>LinkedHashSet：</strong> HashSet + 双向链表，保证插入顺序。</li>
      <li><strong>TreeSet：</strong> 基于 <strong>红黑树</strong>（自平衡排序二叉树）实现，元素有序、不重复，不允许 null。</li>
    </ul>

    <h3>4. Map 接口与实现类</h3>
    <ul>
      <li><strong>HashMap：</strong> 底层 <strong>数组 + 链表 + 红黑树</strong>，默认容量16，负载因子0.75。线程不安全，key允许null。</li>
      <li><strong>LinkedHashMap：</strong> HashMap + 双向链表，保证插入顺序。</li>
      <li><strong>TreeMap：</strong> 基于红黑树，key有序，不允许null。</li>
      <li><strong>Hashtable：</strong> 线程安全，key/value都不允许null。</li>
      <li><strong>ConcurrentHashMap：</strong> 分段锁/桶锁实现高并发安全。</li>
    </ul>

    <h3>5. 底层原理与常见面试点</h3>
    <ul>
      <li><strong>HashMap扩容机制：</strong> 超过阈值（容量*负载因子）时，数组扩容为2倍，元素重新分布（再hash）。链表长度大于8时转红黑树（JDK8+）。</li>
      <li><strong>HashMap如何解决哈希冲突：</strong> 拉链法（数组+链表/树），同一个hash值的元素存在链表或树上。</li>
      <li><strong>ArrayList和LinkedList的区别：</strong> 一个数组随机读快，一个链表插入/删除快，场景不同。</li>
      <li><strong>ConcurrentHashMap线程安全原理：</strong> JDK8之前用分段锁Segment，JDK8之后用CAS+Synchronized控制链表/桶节点。</li>
    </ul>

    <h3>6. 集合常见问题总结</h3>
    <ul>
      <li>集合都允许存 null 吗？<br>
        ArrayList/LinkedList/HashMap/HashSet 允许，TreeSet/TreeMap 不允许（排序需要compare）。Hashtable 不允许。</li>
      <li>fail-fast机制？<br>
        多线程或遍历过程中结构被修改，会抛出 <code>ConcurrentModificationException</code>。</li>
      <li>为什么HashMap不是线程安全的？<br>
        并发put时可能导致数据覆盖或死循环（JDK7链表头插法导致环），需要用ConcurrentHashMap替代。</li>
    </ul>

    <h2>三、常用泛型与增强for</h2>
    <ul>
      <li><strong>泛型：</strong> Java5引入，提供类型安全，防止强制类型转换。</li>
      <li><strong>增强for：</strong> <code>for (Type var : collection) {...}</code>，本质是迭代器遍历。</li>
    </ul>
  </div>
</article>
`,
  'javathread-basic': `
<article>
  <header>
    <h1>Java多线程编程 &amp; 多线程原理</h1>
  </header>
  <div class="page-body">

    <h2>一、Java多线程基础</h2>
    <ul>
      <li><strong>线程：</strong> 程序中的独立执行路径。Java 用 <code>Thread</code> 类或实现 <code>Runnable</code> 接口创建线程。</li>
      <li><strong>进程与线程区别：</strong> 进程是资源分配单位，线程是执行单位。一个进程可包含多个线程，共享内存。</li>
      <li><strong>线程状态：</strong> 新建（NEW）、就绪（RUNNABLE）、运行、阻塞/等待（BLOCKED/WAITING/TIMED_WAITING）、终止（TERMINATED）。</li>
    </ul>

    <h3>1. 线程的创建方式</h3>
    <ul>
      <li>继承 <code>Thread</code> 类，重写 <code>run()</code> 方法。</li>
      <li>实现 <code>Runnable</code> 接口（推荐，避免单继承局限）。</li>
      <li>实现 <code>Callable</code> 接口（可有返回值，可抛异常），结合 <code>FutureTask</code>。</li>
      <li>使用 <code>线程池</code>（<code>ExecutorService</code>）。</li>
    </ul>

    <h3>2. 线程的启动和停止</h3>
    <ul>
      <li>调用 <code>start()</code> 启动线程，自动调用 <code>run()</code> 方法。</li>
      <li>不能用 <code>stop()</code>、<code>suspend()</code>（已废弃，容易死锁），推荐用 <code>中断标志</code>（<code>interrupt()</code>）安全结束。</li>
    </ul>

    <h2>二、Java多线程原理</h2>
    <h3>1. 并发模型与内存可见性</h3>
    <ul>
      <li><strong>Java内存模型(JMM)：</strong> 规范了多线程间变量可见性、原子性和有序性。每个线程有本地工作内存，主内存存放共享变量。</li>
      <li><strong>可见性问题：</strong> 一个线程对变量的修改，其他线程可能看不到。</li>
      <li><strong>happens-before原则：</strong> JMM 保证了某些操作顺序先于其他操作，如锁、volatile写-读、线程启动/结束等。</li>
    </ul>

    <h3>2. 线程安全问题及解决方案</h3>
    <ul>
      <li><strong>原子性：</strong> 指某操作不可分割。自增、复合操作都不是原子的（如<code>i++</code>）。</li>
      <li><strong>可见性：</strong> 多线程下，变量修改需及时被其他线程看到。用 <code>volatile</code>、<code>synchronized</code> 保证可见性。</li>
      <li><strong>有序性：</strong> JIT/编译器/CPU会指令重排，JMM 通过内存屏障限制关键指令重排。</li>
      <li><strong>常见线程安全工具：</strong>
        <ul>
          <li><code>synchronized</code> 关键字（隐式锁，内置监视器/对象锁）。</li>
          <li><code>ReentrantLock</code>（可重入锁，显示加锁解锁，支持公平/非公平锁、可中断、条件变量）。</li>
          <li><code>volatile</code> 保证可见性但不保证原子性。</li>
          <li>原子类 <code>AtomicInteger</code>（基于CAS无锁实现）。</li>
        </ul>
      </li>
    </ul>

    <h3>3. 常见并发问题</h3>
    <ul>
      <li><strong>竞态条件(Race Condition)：</strong> 多线程同时读写共享变量，导致不确定结果。</li>
      <li><strong>死锁(DeadLock)：</strong> 两个或多个线程互相等待对方释放资源，导致永久阻塞。</li>
      <li><strong>活锁(LiveLock)：</strong> 线程活着但相互让步，导致任务一直得不到完成。</li>
      <li><strong>饥饿(Starvation)：</strong> 线程始终得不到所需资源执行。</li>
    </ul>

    <h3>4. 线程通信</h3>
    <ul>
      <li>经典通信方式：<code>wait()</code>、<code>notify()</code>、<code>notifyAll()</code>（必须在同步块/方法中调用）。</li>
      <li>高级通信方式：<code>Lock</code> 的 <code>Condition</code>、阻塞队列 <code>BlockingQueue</code>。</li>
    </ul>

    <h3>5. 线程池原理</h3>
    <ul>
      <li>通过 <code>Executor</code> 框架实现，常用 <code>ThreadPoolExecutor</code>。</li>
      <li>核心参数：<code>corePoolSize</code>、<code>maximumPoolSize</code>、<code>keepAliveTime</code>、<code>workQueue</code>、<code>RejectedExecutionHandler</code>。</li>
      <li>好处：复用线程、降低频繁创建销毁开销、统一资源管理。</li>
    </ul>

    </div>
</article>
`,
  'jvm-gc-basic': `
<article>
  <header>
    <h1>JVM的创建过程 &amp; 垃圾回收算法</h1>
  </header>
  <div class="page-body">

    <h2>一、JVM的创建过程</h2>
    <ul>
      <li>JVM（Java Virtual Machine）是 Java 程序的运行环境，屏蔽了操作系统差异。</li>
      <li>JVM的主要组成：<strong>类加载器（ClassLoader）</strong>、<strong>执行引擎</strong>、<strong>内存区域</strong>、<strong>垃圾收集器</strong>、<strong>本地方法接口（JNI）</strong>。</li>
    </ul>
    <h3>1. JVM启动流程</h3>
    <ol>
      <li>操作系统加载 <strong>JVM 程序（java.exe/java进程）</strong>，分配内存。</li>
      <li>JVM初始化 <strong>堆、方法区、虚拟机栈、本地方法栈、程序计数器</strong> 等内存结构。</li>
      <li>启动 <strong>Bootstrap ClassLoader</strong>，依次加载JRE/lib下的核心类（如rt.jar）。</li>
      <li>加载并初始化主类（含<code>main()</code>方法）。</li>
      <li>解释执行/编译执行主类代码，应用开始运行。</li>
      <li>JVM运行过程中，类加载器动态加载/卸载类，内存分配/释放，垃圾回收器监控堆内存。</li>
      <li>程序执行完毕，JVM关闭，操作系统回收进程资源。</li>
    </ol>
    <ul>
      <li>核心机制：<strong>类加载机制（双亲委派）</strong>，先交给父加载器，只有父类找不到才自己加载。</li>
      <li>执行引擎：将字节码转换为机器指令，JVM支持解释执行和JIT编译。</li>
    </ul>

    <h3>2. JVM内存结构</h3>
    <ul>
      <li><strong>堆（Heap）：</strong> 对象实例、数组，GC管理的主要区域。</li>
      <li><strong>方法区（MetaSpace）：</strong> 类信息、常量、静态变量。</li>
      <li><strong>虚拟机栈：</strong> 方法调用与局部变量，线程私有。</li>
      <li><strong>本地方法栈：</strong> 本地C/C++方法服务。</li>
      <li><strong>程序计数器：</strong> 记录每个线程当前执行字节码的位置。</li>
    </ul>

    <h2>二、JVM垃圾回收算法</h2>
    <h3>1. 对象存活判定</h3>
    <ul>
      <li><strong>引用计数法：</strong> 每个对象维护一个引用计数，引用+1，断开-1，计数为0可回收。不能解决循环引用问题。</li>
      <li><strong>可达性分析算法（根搜索法）：</strong> 从GC Roots（如虚拟机栈、方法区静态变量、常量池等）出发，能直接或间接到达的对象为存活对象。</li>
    </ul>

    <h3>2. 常用垃圾回收算法</h3>
    <ul>
      <li><strong>标记-清除（Mark-Sweep）：</strong>
        <ul>
          <li>分两步：标记所有可达对象，然后清除所有未被标记对象。</li>
          <li>优点：实现简单，缺点：清除后产生内存碎片。</li>
        </ul>
      </li>
      <li><strong>复制算法（Copying）：</strong>
        <ul>
          <li>将内存分为两块，每次只用一块，回收时把存活对象复制到另一块，剩余一次性清理。</li>
          <li>优点：无碎片，适合新生代；缺点：浪费内存空间。</li>
        </ul>
      </li>
      <li><strong>标记-整理（Mark-Compact）：</strong>
        <ul>
          <li>标记后将存活对象全部向一端移动，释放中间空间。</li>
          <li>优点：无碎片，适合老年代。</li>
        </ul>
      </li>
      <li><strong>分代收集算法：</strong>
        <ul>
          <li>将堆划分为新生代和老年代，对新生代用复制算法，老年代用标记-清除/整理。</li>
          <li>根据对象生命周期特点优化GC效率。</li>
        </ul>
      </li>
    </ul>

    <h3>3. 常见垃圾收集器</h3>
    <ul>
      <li><strong>Serial GC：</strong> 单线程，简单高效，适合Client模式。</li>
      <li><strong>ParNew GC：</strong> Serial的多线程版，新生代并行回收。</li>
      <li><strong>Parallel/吞吐量优先GC：</strong> 多线程高效，适合多核服务器。</li>
      <li><strong>CMS GC：</strong> 并发标记清除，低停顿，适合响应要求高。</li>
      <li><strong>G1 GC：</strong> 区块式回收，预测性强，JDK9+默认，适合大内存低停顿场景。</li>
    </ul>

    <h3>4. GC调优常用参数</h3>
    <ul>
      <li><code>-Xms</code> / <code>-Xmx</code>：最小/最大堆内存。</li>
      <li><code>-Xmn</code>：新生代大小。</li>
      <li><code>-XX:SurvivorRatio</code>：Eden与Survivor区比例。</li>
      <li><code>-XX:+UseG1GC</code>：使用G1回收器。</li>
      <li><code>-XX:MetaspaceSize</code> / <code>-XX:MaxMetaspaceSize</code>：方法区大小。</li>
      <li><code>-XX:+PrintGCDetails</code>：输出详细GC日志。</li>
    </ul>
  </div>
</article>
`,
  'mysql-design-index-analyze': `
<article>
  <header>
    <h1>MySQL表结构设计、索引优化、慢查询分析、事务隔离级别</h1>
  </header>
  <div class="page-body">

    <h2>一、表结构设计</h2>
    <ul>
      <li><strong>规范化设计：</strong> 避免数据冗余，常用三范式，保证唯一性、一致性、最小冗余。</li>
      <li><strong>主键设计：</strong> 推荐用自增主键或UUID，尽量短小、不可变。</li>
      <li><strong>字段类型选择：</strong>
        <ul>
          <li>优先使用定长类型（如 <code>char</code>），变长用 <code>varchar</code>，长文本/二进制用 <code>text</code>/<code>blob</code>。</li>
          <li>数字优先选 <code>int</code>，而非 <code>bigint</code>，避免空间浪费。</li>
          <li>金额用 <code>decimal</code>，时间用 <code>datetime</code>/<code>timestamp</code>。</li>
        </ul>
      </li>
      <li><strong>避免使用NULL：</strong> 尽量不让字段为NULL，影响索引与统计。</li>
      <li><strong>表设计常见反例：</strong> 不推荐单表大宽表、过多字段、无主键、字段类型过大等。</li>
    </ul>

    <h2>二、索引优化</h2>
    <ul>
      <li><strong>索引类型：</strong>
        <ul>
          <li>主键索引（PRIMARY KEY）</li>
          <li>唯一索引（UNIQUE）</li>
          <li>普通索引（INDEX）</li>
          <li>全文索引（FULLTEXT）</li>
          <li>联合索引（组合多个字段）</li>
        </ul>
      </li>
      <li><strong>B+树索引原理：</strong> MySQL大部分索引是B+树结构，叶子节点存储有序数据和指针。</li>
      <li><strong>索引优化原则：</strong>
        <ul>
          <li>高区分度字段建索引。</li>
          <li>频繁查询/排序/分组的字段建索引。</li>
          <li>覆盖索引：查询只用到索引列，减少回表。</li>
          <li>前缀索引适合长字段。</li>
          <li>联合索引推荐“最左前缀”原则。</li>
        </ul>
      </li>
      <li><strong>索引失效场景：</strong> where中索引列有计算/函数、模糊匹配开头、OR连接非全部索引、类型不一致、范围查询放前面等。</li>
      <li><strong>避免过多索引：</strong> 插入/更新性能会下降，建议合理数量。</li>
    </ul>

    <h2>三、慢查询分析</h2>
    <ul>
      <li><strong>慢查询日志：</strong> 配置<code>slow_query_log</code>，记录执行时间超过阈值的SQL。</li>
      <li><strong>EXPLAIN 分析：</strong>
        <ul>
          <li>使用 <code>EXPLAIN</code> 查看SQL的执行计划。</li>
          <li>关注<code>type</code>（访问类型，越靠近ALL越差）、<code>key</code>（使用的索引）、<code>rows</code>（扫描行数）、<code>extra</code>（Using index、Using filesort等）。</li>
        </ul>
      </li>
      <li><strong>慢SQL常见原因：</strong>
        <ul>
          <li>无索引或索引失效。</li>
          <li>全表扫描、回表次数多。</li>
          <li>大批量数据操作。</li>
        </ul>
      </li>
      <li><strong>优化思路：</strong> 建合理索引、SQL拆分、避免大事务、用limit/分页、垂直/水平拆分表。</li>
    </ul>

    <h2>四、事务隔离级别</h2>
    <ul>
      <li><strong>事务：</strong> 保证一组SQL要么全部执行要么全部不执行（ACID）。</li>
      <li><strong>隔离级别：</strong>
        <ol>
          <li><strong>读未提交（Read Uncommitted）：</strong> 允许脏读，几乎不用。</li>
          <li><strong>读已提交（Read Committed）：</strong> Oracle默认，防止脏读，但不可重复读。</li>
          <li><strong>可重复读（Repeatable Read）：</strong> MySQL默认，防止不可重复读，但有幻读。</li>
          <li><strong>串行化（Serializable）：</strong> 最严格，完全串行，性能低。</li>
        </ol>
      </li>
      <li><strong>常见并发问题：</strong>
        <ul>
          <li>脏读：读到未提交数据。</li>
          <li>不可重复读：同一事务两次读结果不同。</li>
          <li>幻读：同一事务两次读范围内行数不一致。</li>
        </ul>
      </li>
      <li><strong>MySQL实现：</strong> 通过MVCC（多版本并发控制）、行锁/表锁等机制实现。</li>
    </ul>
  </div>
</article>
`,
  'jump-game': `
<article>
  <header>
    <h1>跳跃游戏（Jump Game）</h1>
  </header>
  <div class="page-body">

    <h2>问题描述</h2>
    <p>给定一个非负整数数组 <code>nums</code>，你最初位于数组的第一个下标（下标 0）。数组中的每个元素 <code>nums[i]</code> 代表你在该位置可以跳跃的最大长度。你的目标是判断你是否能够到达数组的最后一个下标。</p>
    <ul>
      <li><strong>输入:</strong> int[] nums （非负整数数组）</li>
      <li><strong>输出:</strong> boolean（如果能到达最后一个下标返回 true，否则返回 false）</li>
    </ul>
    <p><strong>示例 1：</strong></p>
    <pre>
nums = [2, 3, 1, 1, 4]
输出: true
解释: 从下标 0 跳 1 步到下标 1，然后从下标 1 跳 3 步到达最后一个下标。
    </pre>
    <p><strong>示例 2：</strong></p>
    <pre>
nums = [3, 2, 1, 0, 4]
输出: false
解释: 你会最终到达下标 3，此时 nums[3] = 0。由于无法从下标 3 继续跳跃，因此不可能到达最后一个下标。
    </pre>

    <hr/>

    <h2>核心思想：贪心算法</h2>
    <ul>
      <li>使用变量 <code>max_reach</code> 跟踪从起点出发目前能到达的最远下标。</li>
      <li>遍历每个下标 <code>i</code>，如果 <code>i &gt; max_reach</code> 说明此处不可达，直接返回 false。</li>
      <li>每次更新 <code>max_reach = Math.max(max_reach, i + nums[i])</code>。</li>
      <li>只要 <code>max_reach</code> 覆盖到或超过最后一个下标，立即返回 true。</li>
    </ul>

    <hr/>

    <h2>算法步骤</h2>
    <ol>
      <li>获取数组长度 <code>n</code>。若 <code>n==1</code>，直接返回 true。</li>
      <li>初始化 <code>max_reach=0</code>。</li>
      <li>遍历下标 <code>i</code> 从 0 到 n-1：
        <ul>
          <li>若 <code>i &gt; max_reach</code>，直接返回 false。</li>
          <li>更新 <code>max_reach = Math.max(max_reach, i + nums[i])</code>。</li>
          <li>若 <code>max_reach &gt;= n-1</code>，直接返回 true。</li>
        </ul>
      </li>
      <li>遍历完后还未返回 true，则返回 false。</li>
    </ol>

    <hr/>

    <h2>Java 代码</h2>
    <pre><code>class Solution {
    public boolean canJump(int[] nums) {
        int n = nums.length;
        if (n == 1) return true;
        int max_reach = 0;
        for (int i = 0; i < n; i++) {
            if (i > max_reach) return false;
            max_reach = Math.max(max_reach, i + nums[i]);
            if (max_reach >= n - 1) return true;
        }
        return false;
    }
}</code></pre>

    <hr/>

    <h2>复杂度分析</h2>
    <ul>
      <li><strong>时间复杂度：</strong> O(N)</li>
      <li><strong>空间复杂度：</strong> O(1)</li>
    </ul>

    <hr/>

    <h2>贪心算法有效性解释</h2>
    <ul>
      <li>每一步都选择当前可达的最远距离作为“局部最优”，只要某一步 <code>max_reach</code> 覆盖到终点，就保证至少存在一条路径。</li>
      <li>如果遇到一个下标 <code>i</code> 超过了 <code>max_reach</code>，说明无法继续前进，终点不可达。</li>
    </ul>
  </div>
</article>
`,
  'mysql-explain-index': `
<article>
  <header>
    <h1>EXPLAIN 分析 SQL 执行计划 &amp; 索引原理与设计</h1>
  </header>
  <div class="page-body">

    <h2>一、使用 EXPLAIN 分析 SQL 执行计划</h2>
    <ul>
      <li><strong>EXPLAIN</strong> 语句用于分析 SQL 的实际执行路径和使用的索引，帮助发现 SQL 性能瓶颈。</li>
      <li>基本用法：<code>EXPLAIN SELECT ...</code></li>
      <li>主要关注字段：
        <ul>
          <li><code>id</code>：查询中每个子句的执行顺序，值越大优先级越高。</li>
          <li><code>select_type</code>：查询类型（SIMPLE、PRIMARY、SUBQUERY 等）。</li>
          <li><code>table</code>：当前分析的表。</li>
          <li><code>type</code>：访问类型（性能从好到差：<code>const</code> &gt; <code>eq_ref</code> &gt; <code>ref</code> &gt; <code>range</code> &gt; <code>index</code> &gt; <code>ALL</code>），<b>ALL 为全表扫描</b>。</li>
          <li><code>possible_keys</code>：可能用到的索引。</li>
          <li><code>key</code>：实际用到的索引。</li>
          <li><code>key_len</code>：使用的索引长度。</li>
          <li><code>rows</code>：预计要扫描的行数。</li>
          <li><code>Extra</code>：额外信息（如 Using index、Using filesort、Using temporary）。</li>
        </ul>
      </li>
      <li>
        <strong>常见优化方向：</strong>
        <ul>
          <li>让 <code>type</code> 尽量为 <code>ref</code> 或 <code>const</code>，避免 <code>ALL</code>。</li>
          <li>关注 <code>rows</code> 数量，越少越好。</li>
          <li>关注 <code>Extra</code> 中是否为 <code>Using filesort</code>、<code>Using temporary</code>（性能较差）。</li>
        </ul>
      </li>
      <li>
        <strong>EXPLAIN 示例：</strong>
        <pre><code>EXPLAIN SELECT * FROM user WHERE age &gt; 18 AND name = 'Tom';</code></pre>
      </li>
    </ul>

    <h2>二、B+树索引原理</h2>
    <ul>
      <li>MySQL 的主流存储引擎（如 InnoDB）索引结构为 <b>B+树</b>。</li>
      <li><strong>B+树特点：</strong>
        <ul>
          <li>所有数据都存储在叶子节点，叶子节点之间有链表指针。</li>
          <li>非叶子节点只存储键值信息，减少磁盘IO，提高查找效率。</li>
          <li>查询、插入、范围查找效率高，适合大数据量的磁盘存储。</li>
        </ul>
      </li>
      <li>
        <strong>主键索引（聚集索引）：</strong> 叶子节点保存整行数据。
      </li>
      <li>
        <strong>辅助索引（二级索引）：</strong> 叶子节点保存主键值，查找时需“回表”。
      </li>
    </ul>

    <h2>三、覆盖索引</h2>
    <ul>
      <li><b>覆盖索引（Covering Index）</b>：查询所需的字段全部在某个索引里，无需回表。</li>
      <li>优点：减少 IO 和回表操作，提升查询效率。</li>
      <li>EXPLAIN 的 <code>Extra</code> 字段显示 <code>Using index</code> 即为覆盖索引。</li>
      <li>例子：<code>SELECT age FROM user WHERE name = 'Tom';</code>，如果建有 (name, age) 联合索引，此 SQL 就是覆盖索引。</li>
    </ul>

    <h2>四、联合索引设计原则</h2>
    <ul>
      <li><b>联合索引：</b> 一个索引包含多个字段（如 <code>KEY idx_name_age (name, age)</code>）。</li>
      <li><b>最左前缀原则：</b> 查询条件需要命中联合索引的最左连续字段。例如建索引 (a,b,c) 时，a、a+b、a+b+c 都能用到索引，b+c 不行。</li>
      <li><b>顺序很重要：</b> 把区分度高、常用做范围/等值查询的字段放前面。</li>
      <li><b>能用联合索引就别用多个单列索引。</b></li>
      <li>覆盖索引和联合索引通常配合使用，提升效率。</li>
    </ul>
  </div>
</article>
`,
  'redis-structure-usage': `
<article>
  <h1>Redis 核心知识笔记</h1>

  <h2>一、五大数据结构及典型使用场景</h2>
  <ul>
    <li><strong>String：</strong>最基本的数据类型，常用于缓存对象（如Token、用户信息）</li>
    <li><strong>List：</strong>链表结构，常用于消息队列、任务队列（如秒杀异步下单）</li>
    <li><strong>Set：</strong>无序集合，常用于点赞、标签、去重（如签到去重）</li>
    <li><strong>Hash：</strong>键值对集合，适合存储对象字段（如用户信息表）</li>
    <li><strong>ZSet（有序集合）：</strong>带分数的集合，常用于排行榜、延迟队列</li>
  </ul>

  <h3>典型场景示例</h3>
  <ul>
    <li>缓存：<code>String + JSON</code> 存对象，配合过期时间</li>
    <li>排行榜：使用 <code>ZSet</code> 存用户得分</li>
    <li>布隆过滤器：结合第三方库 + Bitmap 实现大规模去重判重</li>
    <li>延迟队列：<code>ZSet</code> 中 score 设为触发时间戳，定期轮询处理</li>
  </ul>

  <hr/>

  <h2>二、持久化机制</h2>
  <ul>
    <li><strong>RDB（快照）</strong>：定时/触发保存内存快照，恢复速度快，占用小；风险在于可能丢失最后一次快照后的数据</li>
    <li><strong>AOF（追加日志）</strong>：每次写操作都会追加日志文件，重启时回放，数据更安全但文件更大</li>
    <li><strong>混合持久化</strong>：Redis 4.0 起默认支持，结合 RDB 快照和 AOF 重放速度</li>
  </ul>

  <hr/>

  <h2>三、主从复制、哨兵与集群机制</h2>
  <ul>
    <li><strong>主从复制</strong>：master 写，slave 读，实现读写分离，提升性能</li>
    <li><strong>哨兵机制</strong>：Sentinel 自动故障转移 + 监控主从节点，保障高可用</li>
    <li><strong>Redis 集群</strong>：将数据划分 slot（16384 个），自动分片实现大规模分布式部署</li>
  </ul>

  <hr/>

  <h2>四、缓存三大问题及优化方案</h2>
  <h3>1. 缓存穿透</h3>
  <ul>
    <li><strong>问题：</strong>频繁请求数据库中不存在的数据，缓存不命中，每次都打数据库</li>
    <li><strong>解决方案：</strong>
      <ul>
        <li>缓存空对象（设置短 TTL）</li>
        <li>使用布隆过滤器提前拦截无效 key</li>
      </ul>
    </li>
  </ul>

  <h3>2. 缓存击穿</h3>
  <ul>
    <li><strong>问题：</strong>某热点 key 过期瞬间，大量请求同时打 DB</li>
    <li><strong>解决方案：</strong>
      <ul>
        <li>热点 key 设置永不过期 + 定时刷新</li>
        <li>加互斥锁（如分布式锁）防止同时回源</li>
      </ul>
    </li>
  </ul>

  <h3>3. 缓存雪崩</h3>
  <ul>
    <li><strong>问题：</strong>大量 key 同时过期，数据库压力骤增</li>
    <li><strong>解决方案：</strong>
      <ul>
        <li>设置随机过期时间，错开 key 的失效</li>
        <li>配合限流、降级策略保障系统可用性</li>
      </ul>
    </li>
  </ul>

  <hr/>

  <h2>五、实践优化经验</h2>
  <ul>
    <li>采用 <code>LocalCache + Redis</code> 两级缓存，提升热点命中率</li>
    <li>使用 Redisson 实现可重入分布式锁，保障数据一致性</li>
    <li>构建异步刷新机制，定期同步缓存与数据库状态</li>
    <li>监控 <code>QPS/命中率/KeySize/TTL</code>，及时调整策略</li>
  </ul>
</article>
`,
  'spring-system': `
<article>
  <h1>🌱 Spring 技术体系详解</h1>

  <h2>1. Spring Framework</h2>
  <p>
    Spring Framework 是整个 Spring 家族的核心基础模块，提供了控制反转（IoC）、面向切面编程（AOP）、事务控制等能力。
  </p>
  <ul>
    <li><strong>IoC（Inversion of Control）：</strong>
      控制反转是一种设计原则，把对象的创建和依赖的维护交给 Spring 容器来管理，从而实现组件之间的解耦。通过 @Component、@Service、@Repository 等注解，配合 @Autowired 或构造函数注入，可以轻松实现依赖注入。
    </li>
    <li><strong>Bean 生命周期：</strong>
      Bean 从初始化到销毁经历多个阶段，如实例化、属性注入、初始化方法（@PostConstruct）、销毁方法（@PreDestroy），可以通过 BeanPostProcessor 进行扩展。
    </li>
    <li><strong>AOP：</strong>
      通过 @Aspect 注解定义切面类，可在方法执行前后插入自定义逻辑。常用于日志记录、权限校验、事务管理等。底层使用 JDK 动态代理或 CGLIB 代理实现。
    </li>
    <li><strong>事务管理：</strong>
      支持声明式事务（@Transactional）和编程式事务（TransactionTemplate）。事务传播行为如 REQUIRED、REQUIRES_NEW 决定事务边界，隔离级别如 READ_COMMITTED 控制并发访问的一致性。
    </li>
  </ul>

  <h2>2. Spring Boot</h2>
  <p>
    Spring Boot 是为简化 Spring 应用开发而诞生的框架，它封装了大量默认配置，使开发者能快速启动项目。
  </p>
  <ul>
    <li><strong>自动配置原理：</strong>
      依赖 @EnableAutoConfiguration 注解，结合 spring.factories 文件，通过条件注解（@Conditional）判断是否加载某些配置类，实现按需自动注入 Bean。
    </li>
    <li><strong>Starter 模块：</strong>
      各种功能模块如 Web、Redis、MyBatis 都有对应的 starter，例如 <code>spring-boot-starter-web</code>，可以零配置快速接入依赖。
    </li>
    <li><strong>配置文件管理：</strong>
      支持 application.yml 和 application.properties，通过 <code>spring.profiles.active</code> 实现不同环境配置切换；@ConfigurationProperties 可将配置项绑定为对象。
    </li>
    <li><strong>快速构建能力：</strong>
      配合 Spring Initializr，可以一键生成整合了 Maven、热部署、健康检查、Swagger 的项目骨架，大幅提升开发效率。
    </li>
  </ul>

  <h2>3. Spring MVC</h2>
  <p>
    Spring MVC 是一种基于 Servlet 的 Web 框架，支持 RESTful 架构，适合构建前后端分离系统。
  </p>
  <ul>
    <li><strong>控制器开发：</strong>
      使用 @RestController 定义 API 接口，结合 @GetMapping、@PostMapping、@RequestParam、@PathVariable 实现参数绑定。
    </li>
    <li><strong>参数校验：</strong>
      基于 JSR303 规范，引入 Hibernate Validator，使用 @Valid 和 @NotBlank、@Min 等注解对入参进行自动校验，结合 BindingResult 获取错误信息。
    </li>
    <li><strong>统一异常处理：</strong>
      使用 @ControllerAdvice + @ExceptionHandler 统一处理业务异常与系统异常，提升接口稳定性和可维护性。
    </li>
    <li><strong>拦截器机制：</strong>
      通过实现 HandlerInterceptor 接口，可以对请求进行前置处理（如鉴权）、后置处理（如日志记录），是实现全局控制逻辑的有效手段。
    </li>
  </ul>

  <h2>4. Spring Security & JWT</h2>
  <p>
    Spring Security 是一个功能强大的安全框架，负责认证（Authentication）与授权（Authorization），支持自定义登录逻辑与 Token 授权方案。
  </p>
  <ul>
    <li><strong>认证流程：</strong>
      用户提交用户名密码 -> UsernamePasswordAuthenticationFilter 拦截 -> AuthenticationManager -> UserDetailsService 加载用户信息 -> 校验成功生成 Authentication。
    </li>
    <li><strong>授权机制：</strong>
      可使用注解如 @PreAuthorize("@auth.check(...)") 或配置方式控制资源访问权限，支持基于角色、权限、SpEL 表达式的细粒度控制。
    </li>
    <li><strong>JWT 集成：</strong>
      实现前后端分离登录方案，登录成功生成 JWT 并返回前端，后续访问通过 JWT 解析用户信息并放入 SpringSecurity 上下文。
    </li>
    <li><strong>RBAC 模型：</strong>
      将用户、角色、权限解耦，通过中间表建立多对多关系，更灵活地控制系统权限。
    </li>
    <li><strong>OAuth2 授权：</strong>
      掌握授权码模式、密码模式、客户端模式、隐式模式，了解 Spring Authorization Server 的搭建方法。
    </li>
  </ul>

  <h2>5. Spring AOP（注解切面编程）</h2>
  <ul>
    <li><strong>切点表达式：</strong>
      通过 execution() 指定切点位置，例如：<code>@Around("execution(* com.zzyl..*.service..*(..))")</code>。</li>
    <li><strong>应用场景：</strong>
      AOP 被广泛用于操作日志收集、权限校验、接口限流、慢接口监控、分布式事务协调等横切逻辑的实现。</li>
    <li><strong>Advice 类型：</strong>
      包括 @Before、@After、@AfterReturning、@Around、@AfterThrowing，不同类型分别处理方法执行的不同阶段。
    </li>
  </ul>

  <h2>6. Spring 事务控制</h2>
  <ul>
    <li><strong>@Transactional 使用：</strong>
      可加在类或方法上，默认只对运行时异常（RuntimeException）触发回滚，也可通过 rollbackFor 指定回滚类型。</li>
    <li><strong>事务传播行为：</strong>
      如 REQUIRED（默认，加入当前事务）、REQUIRES_NEW（新建事务）、NESTED（嵌套事务）等。</li>
    <li><strong>隔离级别：</strong>
      控制并发事务间的可见性问题，如读未提交（READ_UNCOMMITTED）、可重复读（REPEATABLE_READ）等。</li>
    <li><strong>事务失效场景：</strong>
      如方法内部调用、未被 Spring 管理的类、捕获异常未重新抛出，都会导致 @Transactional 失效。
    </li>
  </ul>

  <h2>7. Spring AI</h2>
  <p>
    Spring AI 是 2024 年推出的统一 AI 编程模型，旨在降低大模型应用接入门槛，支持多种模型平台如 OpenAI、通义千问、文心一言等。
  </p>
  <ul>
    <li><strong>PromptTemplate：</strong>封装 prompt 模板与参数，适合做文本补全、对话生成等。</li>
    <li><strong>ChatClient：</strong>核心接口类，调用大语言模型进行交互式聊天。</li>
    <li><strong>EmbeddingClient：</strong>将文本向量化，适合语义搜索、知识库匹配等场景。</li>
    <li><strong>支持模型：</strong>OpenAI（GPT-4/3.5）、Azure OpenAI、阿里通义千问、百度文心一言、智谱清言等。</li>
    <li><strong>使用方式：</strong>通过 application.yml 配置 API Key 与 Provider，然后注入 Client 使用。</li>
    <li><strong>常见场景：</strong>构建问答机器人、代码生成、智能摘要、企业知识库问答系统等。
    </li>
  </ul>
</article>
`,
  'message-queue': `
<article>
  <h1>消息队列使用场景及实战（RabbitMQ / EMQ）</h1>

  <h2>一、消息队列的作用</h2>
  <p>消息队列（MQ）是一种异步通信机制，常用于解耦系统、削峰填谷、异步处理和分布式通信。</p>
  <ul>
    <li><strong>解耦：</strong>服务之间不直接调用，降低耦合度。</li>
    <li><strong>异步处理：</strong>下单后通知库存/支付/物流异步执行，加快响应速度。</li>
    <li><strong>削峰填谷：</strong>通过队列缓存流量高峰，防止系统崩溃。</li>
    <li><strong>广播通信：</strong>多服务订阅一个主题，实现通知广播。</li>
    <li><strong>最终一致性：</strong>重要任务通过 MQ 保证落库失败后的重试与补偿。</li>
  </ul>

  <h2>二、RabbitMQ 概述</h2>
  <ul>
    <li><strong>协议：</strong>基于 AMQP（高级消息队列协议），适合企业系统内部通信。</li>
    <li><strong>核心角色：</strong>Producer（生产者）、Exchange（交换机）、Queue（队列）、Consumer（消费者）、RoutingKey（路由键）。</li>
    <li><strong>Exchange 类型：</strong>
      <ul>
        <li><code>Direct</code>：点对点，精确匹配 RoutingKey。</li>
        <li><code>Fanout</code>：广播模式，忽略 RoutingKey，所有绑定的 Queue 都会收到。</li>
        <li><code>Topic</code>：模糊匹配，支持通配符。</li>
        <li><code>Headers</code>：根据 headers 头属性路由。</li>
      </ul>
    </li>
    <li><strong>特性：</strong>支持消息持久化、确认机制（ACK）、死信队列（DLX）、延迟队列（TTL + DLX 实现）。</li>
  </ul>

  <h3>RabbitMQ 实战场景</h3>
  <ul>
    <li><strong>电商下单：</strong>用户下单写入订单表后异步发送 MQ 消息，通知库存系统锁库。</li>
    <li><strong>延迟订单取消：</strong>未支付订单 TTL 后进入死信队列，触发取消操作。</li>
    <li><strong>用户通知系统：</strong>使用 Topic 模式将消息路由给不同服务，如短信、站内信、邮箱。</li>
    <li><strong>日志采集：</strong>不同服务将操作日志发送到 MQ，由日志消费者统一入库或发送到 ELK。</li>
  </ul>

  <h3>实战代码片段（Spring Boot 整合）</h3>
  <pre><code class="language-java">
@Configuration
public class RabbitConfig {
    @Bean
    public Queue orderQueue() {
        return new Queue("order.queue", true); // durable
    }

    @Bean
    public DirectExchange orderExchange() {
        return new DirectExchange("order.exchange");
    }

    @Bean
    public Binding binding() {
        return BindingBuilder.bind(orderQueue())
            .to(orderExchange())
            .with("order.create");
    }
}
  </code></pre>
  <pre><code class="language-java">
// 发送消息
rabbitTemplate.convertAndSend("order.exchange", "order.create", orderDto);
  </code></pre>

  <h2>三、EMQX（EMQ）概述</h2>
  <p>
    EMQX 是一个高性能的开源 MQTT 消息服务器，特别适合物联网（IoT）场景。
  </p>
  <ul>
    <li><strong>协议支持：</strong>MQTT、MQTT-SN、CoAP、LwM2M、WebSocket。</li>
    <li><strong>特性：</strong>百万并发连接、QoS 等级支持（最多一次、至少一次、仅一次）、设备上下线管理、规则引擎。</li>
    <li><strong>集群能力：</strong>支持集群部署，节点间状态共享，便于水平扩展。</li>
  </ul>

  <h3>EMQX 实战场景</h3>
  <ul>
    <li><strong>智能设备上报：</strong>设备定时通过 MQTT 上报温湿度、位置信息。</li>
    <li><strong>实时告警推送：</strong>监测数据超过阈值时，EMQX 使用规则引擎转发到 HTTP API 或 Kafka。</li>
    <li><strong>远程设备控制：</strong>平台通过 MQTT Topic 发布指令，设备监听对应主题并执行。</li>
    <li><strong>与后端集成：</strong>设备上报数据通过 WebHook 转发到后端接口，进行处理与持久化。</li>
  </ul>

  <h3>EMQX 实战技巧</h3>
  <ul>
    <li>通过 Dashboard 配置 WebHook 或 MQTT 规则。</li>
    <li>使用 REST API 批量订阅/取消订阅。</li>
    <li>结合 JWT 或 Client ID 进行设备鉴权。</li>
    <li>利用 Retained 消息实现“设备最后状态”的持久保留。</li>
  </ul>

  <h2>四、对比总结</h2>
  <table>
    <thead>
      <tr><th>特性</th><th>RabbitMQ</th><th>EMQX</th></tr>
    </thead>
    <tbody>
      <tr><td>协议</td><td>AMQP</td><td>MQTT</td></tr>
      <tr><td>场景</td><td>系统解耦、异步通知</td><td>IoT 设备通信</td></tr>
      <tr><td>传输方式</td><td>服务端 <-> 服务端</td><td>端 <-> 云（设备 <-> 平台）</td></tr>
      <tr><td>吞吐能力</td><td>10W+ TPS</td><td>百万级连接</td></tr>
    </tbody>
  </table>

</article>
`
}

