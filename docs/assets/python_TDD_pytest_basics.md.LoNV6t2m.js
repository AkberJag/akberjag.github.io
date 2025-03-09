import{_ as a,c as e,a1 as n,o as t}from"./chunks/framework.BAjNsQ49.js";const u=JSON.parse('{"title":"🛠️ Pytest: The Testing Sidekick","description":"","frontmatter":{},"headers":[],"relativePath":"python/TDD/pytest_basics.md","filePath":"python/TDD/pytest_basics.md","lastUpdated":1741491859000}'),p={name:"python/TDD/pytest_basics.md"};function i(r,s,l,o,c,d){return t(),e("div",null,s[0]||(s[0]=[n(`<h1 id="🛠️-pytest-the-testing-sidekick" tabindex="-1">🛠️ Pytest: The Testing Sidekick <a class="header-anchor" href="#🛠️-pytest-the-testing-sidekick" aria-label="Permalink to &quot;🛠️ Pytest: The Testing Sidekick&quot;">​</a></h1><p>Pytest is a <strong>powerful testing framework</strong> for Python. It’s known for its simplicity, scalability, and rich ecosystem of plugins. Here’s why it’s awesome:</p><ul><li><strong>Concise Syntax</strong>: Write tests with minimal boilerplate.</li><li><strong>Fixtures</strong>: Reusable setup/teardown code for your tests.</li><li><strong>Parameterized Tests</strong>: Run the same test with multiple inputs.</li><li><strong>Rich Assertions</strong>: Get detailed feedback when tests fail.</li></ul><h2 id="installing-pytest-with-uv" tabindex="-1">Installing Pytest with UV <a class="header-anchor" href="#installing-pytest-with-uv" aria-label="Permalink to &quot;Installing Pytest with UV&quot;">​</a></h2><p>To install <code>pytest</code> using <code>uv</code>, run the following command:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">uv</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --dev</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pytest</span></span></code></pre></div><p>This adds <code>pytest</code> as a development dependency in your project.</p><h2 id="🗂️-project-structure" tabindex="-1">🗂️ Project Structure <a class="header-anchor" href="#🗂️-project-structure" aria-label="Permalink to &quot;🗂️ Project Structure&quot;">​</a></h2><p>There’s no one-size-fits-all project structure, but here are two common approaches:</p><h3 id="_1-mirror-the-project-directory-smaller-projects" tabindex="-1">1. <strong>Mirror the Project Directory (Smaller Projects)</strong> <a class="header-anchor" href="#_1-mirror-the-project-directory-smaller-projects" aria-label="Permalink to &quot;1. **Mirror the Project Directory (Smaller Projects)**&quot;">​</a></h3><p>For smaller projects, you can mirror your project directory structure in the <code>tests</code> folder. This keeps things simple and easy to navigate.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>superhero_api/</span></span>
<span class="line"><span>├── src/</span></span>
<span class="line"><span>│   ├── models/</span></span>
<span class="line"><span>│   ├── services/</span></span>
<span class="line"><span>│   ├── routes/</span></span>
<span class="line"><span>│   └── database.py</span></span>
<span class="line"><span>├── tests/</span></span>
<span class="line"><span>│   ├── models/</span></span>
<span class="line"><span>│   ├── services/</span></span>
<span class="line"><span>│   ├── routes/</span></span>
<span class="line"><span>|   ├── conftest.py</span></span>
<span class="line"><span>│   └── pytest.ini</span></span>
<span class="line"><span>└── main.py</span></span></code></pre></div><h3 id="_2-organize-by-test-type-larger-projects" tabindex="-1">2. <strong>Organize by Test Type (Larger Projects)</strong> <a class="header-anchor" href="#_2-organize-by-test-type-larger-projects" aria-label="Permalink to &quot;2. **Organize by Test Type (Larger Projects)**&quot;">​</a></h3><p>For larger projects, you might want to organize tests by type (unit, integration, e2e) within each folder. This makes it easier to manage and run specific types of tests.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>superhero_api/</span></span>
<span class="line"><span>├── src/</span></span>
<span class="line"><span>│   ├── models/</span></span>
<span class="line"><span>│   ├── services/</span></span>
<span class="line"><span>│   ├── routes/</span></span>
<span class="line"><span>│   └── database.py</span></span>
<span class="line"><span>├── tests/</span></span>
<span class="line"><span>│   ├── unit/</span></span>
<span class="line"><span>│   │   ├── models/</span></span>
<span class="line"><span>│   │   ├── services/</span></span>
<span class="line"><span>│   │   └── routes/</span></span>
<span class="line"><span>│   ├── integration/</span></span>
<span class="line"><span>│   │   ├── models/</span></span>
<span class="line"><span>│   │   ├── services/</span></span>
<span class="line"><span>│   │   └── routes/</span></span>
<span class="line"><span>│   ├── e2e/</span></span>
<span class="line"><span>│   │   └── workflows/</span></span>
<span class="line"><span>│   ├── conftest.py</span></span>
<span class="line"><span>│   └── pytest.ini</span></span>
<span class="line"><span>├── requirements.txt</span></span>
<span class="line"><span>└── main.py</span></span></code></pre></div><p><strong>Remember</strong>: There’s no fixed way to structure your tests. Choose what works best for your project and team.</p>`,16)]))}const y=a(p,[["render",i]]);export{u as __pageData,y as default};
