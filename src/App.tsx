import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './App.css';

type ProjectProps = {
  href: string,
  title: string,
};

export const Project: React.FC<ProjectProps> = props => {
  return (
    <div className="Project">
      <h4><a href={props.href}>{props.title}</a></h4>
      {props.children}
    </div>
  );
};

type PublicationProps = {
  title: string,
  authors: string,
  where: string,
  bibtex: string,
  link: string,
  href: string,
};

export const Publication: React.FC<PublicationProps> = props => {
  return (
    <div className="Publication">
      <h4>{props.title}</h4>
      <p><i>{props.authors}</i></p>
      <p>{props.where}</p>
      <p>[<a href={props.bibtex}>bibtex</a>][<a href={props.href}>{props.link}</a>]</p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-avatar">
        <img className="App-avatar-image" src={process.env.PUBLIC_URL + 'avatar.png'} alt="Avatar" />
        <h1>Nathan Corbyn</h1>
        <h3>Oxford, UK</h3>
        <p>Doctoral Computer Science student at the University of Oxford</p>
        <div className="App-buttons">
          <a href="https://github.com/doctorn"><FontAwesomeIcon icon={faGithub} /></a>
        </div>
      </div>
      <div className="App-content">
        <h2>About</h2>
        <p>Hi, I'm Nathan, I'm 23 and I'm currently reading for a DPhil in Computer Science at
        the University of Oxford. I was previously an undergraduate at the University of Cambridge
        and remain a visiting member of the <a href="https://www.cl.cam.ac.uk/research/clash/">
        Cambridge Logical Structures Hub</a>. Broadly speaking, my research interests lie in
        Programming Language Theory; Type Theory; Category Theory; and Compiler Construction.
        I am also a member of the <a href="https://www.cl.cam.ac.uk/~jdy22/projects/frex/">Frex Project</a>.
        </p>
        <p>Beyond the realm of 1s and 0s, I enjoy bouldering and music. I'm also one to dabble in
        philosophy!</p>

        <h2>Publications</h2>
        <div>
          <Publication
            title="Frex: dependently-typed algebraic simplification"
            authors="Guillame Allais, Edwin Brady, Nathan Corbyn, Ohad Kammar and Jeremy Yallop"
            where="(Draft) 2022"
            bibtex="/bib/frex_draft.bib"
            link="pdf"
            href="/pdf/frex_dependently_typed_algebraic_simplification.pdf"
          />
          <Publication
            title="Proof Synthesis with Free Extensions in Intensional Type Theory"
            authors="Nathan Corbyn"
            where="Master's Thesis 2021."
            bibtex="/bib/proof_synthesis.bib"
            link="pdf"
            href="/pdf/proof_synthesis.pdf"
          />
          <Publication
            title="Practical Static Memory Management"
            authors="Nathan Corbyn"
            where="Bachelor's Thesis 2020."
            bibtex="/bib/practical_static_memory_management.bib"
            link="pdf"
            href="/pdf/practical_static_memory_management.pdf"
          />
        </div>

        <h2>Code</h2>
        <div>
          <Project title="homotopy-io/homotopy-rs" href="https://github.com/homotopy-io/homotopy-rs">
            <p><a href="https://beta.homotopy.io/">homotopy.io</a> is a web-based proof
            assistant, built to support a theory of finitely presented globular n-categories.
            I play an active role in the development of the tool's latest incarnation, focusing
            primarily on the interface and graphics code. Most recently, I've been working on
            enabling real-time rendering of 4D surface diagrams as animations.</p>
          </Project>
          <Project title="micro-mitten" href="https://github.com/doctorn/micro-mitten">
            <p>micro-mitten is a bare-bones Rust-like programming language, developed for my
            undergraduate dissertation. It uses a memory-management strategy called ASAP
            (Proust, 2017) to permit full compile-time garbage collection without introducing
            regions or ownership.</p>
          </Project>
          <Project title="rust-lang/rust" href="https://github.com/rust-lang/rust">
            <p>I very occasionally contribute to the Rust compiler. Most of my work so far has
            been connected with the stabilisation of async/await. I haven't had much time to
            contribute recently, but I'm hoping to get stuck in again soon.</p>
          </Project>
        </div>

        <h2>Contact</h2>
        <p>
          The best way to contact me is by email at <a href="mailto:me@nathancorbyn.com">me@nathancorbyn.com</a>.
        </p>
        <p className="App-copyright">Copyright &copy; Nathan Corbyn 2020-21.</p>
      </div>
    </div>
  );
};

export default App;
