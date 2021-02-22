import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './App.css';

type ProjectProps = {
  href: string,
  link: string,
  title: string,
};

export const Project: React.FC<ProjectProps> = props => {
  return (
    <div className="Project">
      <h3>
        {props.title} (<a href={props.href}>{props.link}</a>)
      </h3>
      {props.children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-avatar">
        <img className="App-avatar-image" src={process.env.PUBLIC_URL + 'avatar.png'} alt="Avatar" />
        <h1>Nathan Corbyn</h1>
        <h3>Cambridge, UK</h3>
        <p>Currently studying computer science at the University of Cambridge</p>
        <div className="App-buttons">
          <a href="https://github.com/doctorn"><FontAwesomeIcon icon={faGithub} /></a>
        </div>
      </div>
      <div className="App-content">
        <h2>About</h2>
        <p>Hi, I'm Nathan, I'm 22 and I'm currently a fourth year computer science student at
        the University of Cambridge. I'm interested in programming language theory &amp; semantics;
        type theory; category theory; and foundations of mathematics. I'm normally found on GitHub
        messing around with bits of compilers, but I'm best known for my work in compile-time
        garbage collection.</p>
        <p>Beyond the realm of 1s and 0s, I enjoy bouldering and music. I'm also one to dabble in
        philosophy!</p>
        <h2>Projects</h2>
        <div>
          <Project title="micro-mitten" href="https://github.com/doctorn/micro-mitten" link="code">
            <p>micro-mitten is a bare-bones Rust-like programming language, developed for my
            undergraduate dissertation. It uses a memory-management strategy called ASAP
            (Proust, 2017) to permit full compile-time garbage collection without introducing
            regions or ownership.</p>
          </Project>
          <Project title="rust-lang/rust" href="https://github.com/rust-lang/rust" link="code">
            <p>I very occasionally contribute to the Rust compiler. Most of my work so far has
            been connected with the stabilisation of async/await. I haven't had much time to
            contribute recently, but I'm hoping to get stuck in again soon.</p>
          </Project>
          <Project title="mitten-lang/mitten" href="https://mitten-lang.org/" link="website">
            <p>mitten is a long-term project to develop a fully-featured functional programming
            language supporting the kind of compile-time garbage collection proved in concept
            by micro-mitten. At the moment I'm focused on optimising the performance of
            collections and understanding how ASAP's analyses might behave when extended to
            higher-order functions and other advanced language features.</p>
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
