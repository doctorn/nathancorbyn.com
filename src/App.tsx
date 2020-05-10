import React, { Component, FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './App.css';

import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en: {
    name: "Nathan Corbyn",
    location: "Cambridge, UK",
    bio: "Computer science student at the University of Cambridge",
    alternate: "日本語で見て",
    about: "About",
    intro: `
Hi, I'm Nathan, I'm 21 and I'm currently studying computer science at
the University of Cambridge. I'm interested in programming language theory
and compiler construction. I'm normally found on GitHub messing around with
bits of compilers, but I'm best known for my work in compile-time garbage
collection.`,
    hobbies: `
Beyond the realm of 1s and 0s, I enjoy bouldering and I study Japanese.
All of the translations on this site were done by myself, so if you spot a
mistake please let me know!`,
    projects: "Current work",
    contact: "Contact",
    howto: "The best way to contact me is by email at {0}.",
    email: "E-mail",
    micro: `
micro-mitten is a bare-bones Rust-like programming language, developed for my
undergraduate dissertation. It uses a memory-management strategy called ASAP
(Proust, 2017) to permit full compile-time garbage collection without
introducing regions or ownership.`,
    rust: `
I very occasionally contribute to the Rust compiler. Most of my work so
far has been connected with the stabilisation of async/await. I haven't had
much time to contribute recently, but I'm hoping to get stuck in again soon.`,
    mitten: `
mitten is a long-term project to develop a fully-featured functional programming
language supporting the kind of compile-time garbage collection proved in concept
by micro-mitten. At the moment I'm focused on optimising the performance of
collections and understanding how ASAP's analyses might behave when extended to
higher-order functions and other advanced language features.`,
  },
  jp: {
    name: "コービン・ネイサン",
    location: "ケンブリッジ、UK",
    bio: "ケンブリッジ大学でコンピューターサイエンス学生です",
    alternate: "View in English",
    about: "私について",
    projects: "最近のプロジェクトは",
    contact: "私に連絡",
    howto: "私に連絡すると、{0}でメールする方がいいです。",
    email: "メール",
  },
});

type ProjectProps = {
  href: string,
  link: string,
  title: string,
};

export const Project: FunctionComponent<ProjectProps> = props => {
  return (
    <div className="Project">
      <h3>
        {props.title} (<a href={props.href}>{props.link}</a>)
      </h3>
      {props.children}
    </div>
  );
};

class App extends Component {
  toggleLanguage() {
    if (strings.getLanguage() === "en") {
      strings.setLanguage("jp");
    } else {
      strings.setLanguage("en");
    }
    this.forceUpdate();
  }

  render() {
    return (
      <div className="App">
        <div className="App-avatar">
          <img className="App-avatar-image" src={process.env.PUBLIC_URL + 'avatar.png'} alt="Avatar" />
          <h1>{strings.name}</h1>
          <h3>{strings.location}</h3>
          <p>{strings.bio}</p>
          <div className="App-buttons">
            <a href="https://github.com/doctorn"><FontAwesomeIcon icon={faGithub} /></a>
          </div>
          <button onClick={this.toggleLanguage.bind(this)}>{strings.alternate}</button>
        </div>
        <div className="App-content">
          <h2>{strings.about}</h2>
          <p>{strings.intro}</p>
          <p>{strings.hobbies}</p>
          <h2>{strings.projects}</h2>
          <Project title="micro-mitten" href="https://github.com/doctorn/micro-mitten" link="code">
            <p>{strings.micro}</p>
          </Project>
          <Project title="rust-lang/rust" href="https://github.com/rust-lang/rust" link="code">
            <p>{strings.rust}</p>
          </Project>
          <Project title="mitten-lang/mitten" href="https://mitten-lang.org/" link="website">
            <p>{strings.mitten}</p>
          </Project>
          <h2>{strings.contact}</h2>
          <p>{strings.formatString(strings.howto, <a href="mailto:me@nathancorbyn.com">me@nathancorbyn.com</a>)}</p>
          <p className="App-copyright">Copyright &copy; Nathan Corbyn 2020.</p>
        </div>
      </div>
    );
  }
}

export default App;
