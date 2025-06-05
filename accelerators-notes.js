const NOTES = {
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
`
};
