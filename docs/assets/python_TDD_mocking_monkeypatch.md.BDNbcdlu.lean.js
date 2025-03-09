import{_ as i,c as a,a1 as e,o as t}from"./chunks/framework.BAjNsQ49.js";const d=JSON.parse('{"title":"🎭 Mocking & Monkeypatching in Pytest","description":"","frontmatter":{},"headers":[],"relativePath":"python/TDD/mocking_monkeypatch.md","filePath":"python/TDD/mocking_monkeypatch.md","lastUpdated":1741491859000}'),n={name:"python/TDD/mocking_monkeypatch.md"};function l(h,s,p,o,k,r){return t(),a("div",null,s[0]||(s[0]=[e(`<h1 id="🎭-mocking-monkeypatching-in-pytest" tabindex="-1">🎭 Mocking &amp; Monkeypatching in Pytest <a class="header-anchor" href="#🎭-mocking-monkeypatching-in-pytest" aria-label="Permalink to &quot;🎭 Mocking &amp; Monkeypatching in Pytest&quot;">​</a></h1><h2 id="🔍-what-is-mocking" tabindex="-1">🔍 What is Mocking? <a class="header-anchor" href="#🔍-what-is-mocking" aria-label="Permalink to &quot;🔍 What is Mocking?&quot;">​</a></h2><p>Mocking creates fake objects that pretend to be real ones during testing. It&#39;s like having a stunt double for our code - looks the same, but safer to work with!</p><h2 id="💡-why-use-mocking" tabindex="-1">💡 Why Use Mocking? <a class="header-anchor" href="#💡-why-use-mocking" aria-label="Permalink to &quot;💡 Why Use Mocking?&quot;">​</a></h2><ul><li><strong>Faster Tests:</strong> No waiting for real API calls</li><li><strong>Reliable Tests:</strong> No dependency on external services</li><li><strong>Cost-Effective:</strong> No API usage charges during testing</li><li><strong>Predictable:</strong> We control the test data</li><li><strong>Isolated:</strong> Tests one piece of code at a time</li></ul><h2 id="🐒-what-is-monkeypatch" tabindex="-1">🐒 What is Monkeypatch? <a class="header-anchor" href="#🐒-what-is-monkeypatch" aria-label="Permalink to &quot;🐒 What is Monkeypatch?&quot;">​</a></h2><p>Pytest&#39;s built-in monkeypatch fixture is all we need for mocking! it is the act of dynamically changing a piece of code at runtime. Essentially, it allows we to override the default behavior of a module, object, method, or function without changing its source code.</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-WARNs" id="tab-2j9coH4" checked><label data-title="test_superhero.py" for="tab-2j9coH4">test_superhero.py</label><input type="radio" name="group-WARNs" id="tab-JxLdJ44"><label data-title="get_hero.py" for="tab-JxLdJ44">get_hero.py</label></div><div class="blocks"><div class="language-python vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> superhero_app.api </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> get_hero</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> test_get_hero_api</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(monkeypatch):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    GIVEN a monkeypatched get_hero_from_api function</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    WHEN we call get_hero_from_api</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    THEN it should return our mock superhero data</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> mock_get_hero</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">():</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Spider-Man&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;powers&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;web-slinging&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;spider-sense&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    monkeypatch.setattr(get_hero, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;get_hero_from_api&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, mock_get_hero)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    result </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> get_hero.get_hero_from_api()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    assert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Spider-Man&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    assert</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;web-slinging&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> result[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;powers&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># superhero_app/api/get_hero.py</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> requests</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get_hero_from_api</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">():</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    Fetches superhero data from the very expensive &#39;expensive_api_example.com&#39; API.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    Returns:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        dict: A dictionary containing the superhero&#39;s name and powers.</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    url </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;https://expensive_api_example.com/api/hero&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    response </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> requests.get(url)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    hero_data </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> response.json()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> hero_data</span></span></code></pre></div></div></div><p>We don&#39;t need to import <em>monkeypatch</em>. It&#39;s a built-in pytest fixture, so we just need to add it as a parameter to our test function and pytest will automatically inject it.</p><p>During a test run, <code>mock_get_hero</code> gets called rather than the real <code>get_hero_from_api</code> function. This not only decreases the amount of time it will take for the test to run, but it also makes the test more predictable since it is not affected by network connectivity issues, outages in the expensive superhero API (expensive_api_example.com), or rate limiting issues.</p><h2 id="🛠️-common-monkeypatch-methods" tabindex="-1">🛠️ Common Monkeypatch Methods <a class="header-anchor" href="#🛠️-common-monkeypatch-methods" aria-label="Permalink to &quot;🛠️ Common Monkeypatch Methods&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Replace attributes</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">monkeypatch.setattr(obj, name, value)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Set dictionary entries</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">monkeypatch.setitem(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, key, value)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Set environment variables</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">monkeypatch.setenv(name, value)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Delete environment variables</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">monkeypatch.delenv(name, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">raising</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">True</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="⚠️-best-practices" tabindex="-1">⚠️ Best Practices <a class="header-anchor" href="#⚠️-best-practices" aria-label="Permalink to &quot;⚠️ Best Practices&quot;">​</a></h2><ul><li>Mock at the right level: Mock the smallest unit possible</li><li>Use meaningful test data: Our mock data should represent realistic scenarios</li><li>Clean up after yourself: Pytest&#39;s monkeypatch automatically restores original values after each test</li><li>Document our mocks: Good docstrings explain what&#39;s being mocked and why</li></ul><h2 id="🎯-when-to-use-monkeypatch-vs-other-mocking-tools" tabindex="-1">🎯 When to Use Monkeypatch vs Other Mocking Tools <a class="header-anchor" href="#🎯-when-to-use-monkeypatch-vs-other-mocking-tools" aria-label="Permalink to &quot;🎯 When to Use Monkeypatch vs Other Mocking Tools&quot;">​</a></h2><ul><li>Use monkeypatch for simple attribute/function replacement</li><li>Consider <code>unittest.mock</code> for more complex scenarios (like tracking call counts)</li></ul><h2 id="📚-references" tabindex="-1">📚 References <a class="header-anchor" href="#📚-references" aria-label="Permalink to &quot;📚 References&quot;">​</a></h2><ul><li><a href="https://docs.pytest.org/en/stable/monkeypatch.html" target="_blank">Pytest Monkeypatch Documentation</a></li><li><a href="https://docs.pytest.org/en/stable/how-to/monkeypatch.html" target="_blank">Pytest Monkeypatch How-To Guide</a></li></ul>`,18)]))}const g=i(n,[["render",l]]);export{d as __pageData,g as default};
