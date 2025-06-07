const NOTES = {
  welcome: `
  <article>
    <h1>🌟 欢迎来到 Ronan_JoJo 的学习世界！ 🌟</h1>
    <p>这里记录了各类算法、编程与学习心得。请选择左侧笔记进行浏览。</p>
    <p>本页面持续优化中，欢迎交流指正！</p>
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
  `
}

