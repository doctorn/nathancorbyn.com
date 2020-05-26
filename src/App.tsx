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
Beyond the realm of 1s and 0s, I enjoy bouldering and studying Japanese.
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
    code: `code`,
    website: `website`,
  },
  jp: {
    name: "コービン・ネイサン",
    location: "ケンブリッジ、UK",
    bio: "ケンブリッジ大学でのコンピューターサイエンス学生",
    alternate: "View in English",
    about: "私について",
    projects: "最近のプロジェクトは",
    intro: `こんにちは！ネイサンと言って、２１歳で、ケンブリッジ大学でコンピューターサイエンス
を勉強しています。プログラミング言語理論とコンパイラーを作ることに興味があります。普通はGitHubで
コンパイラーを作って楽しんでいますが、私の一番知られている仕事は翻訳時記憶管理の研究です。`,
    hobbies: `コンピューターサイエンスの以外に、ボルダリングと日本語の勉強に興味があります。
私は自分でこのウェブサイトを訳したので、間違いが見えれば教えてください！`,
    contact: "私に連絡",
    howto: "私に連絡すると、{0}でメールする方がいいです。",
    email: "メール",
    code: "コード",
    website: "ウェブサイト",
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

type AppState = {
  fading: boolean,
};

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      fading: false,
    };
  }

  toggleLanguage() {
    this.setState({
      fading: true,
    });
    setTimeout(() => {
      if (strings.getLanguage() === "en") {
        strings.setLanguage("jp");
      } else {
        strings.setLanguage("en");
      }
      setTimeout(() => {
        this.setState({
          fading: false,
        });
      }, 500);
    }, 500);
  }

  fadeClass() {
    return this.state.fading ? "Fade-fading" : "Fade";
  }

  render() {
    return (
      <div className="App">
        <div className="App-avatar">
          <img className="App-avatar-image" src={process.env.PUBLIC_URL + 'avatar.png'} alt="Avatar" />
          <h1 className={this.fadeClass()}>{strings.name}</h1>
          <h3 className={this.fadeClass()}>{strings.location}</h3>
          <p className={this.fadeClass()}>{strings.bio}</p>
          <div className="App-buttons">
            <a href="https://github.com/doctorn"><FontAwesomeIcon icon={faGithub} /></a>
          </div>
          <button className={this.fadeClass()} onClick={this.toggleLanguage.bind(this)}>{strings.alternate}</button>
        </div>
        <div className="App-content">
          <h2 className={this.fadeClass()}>{strings.about}</h2>
          <p className={this.fadeClass()}>{strings.intro}</p>
          <p className={this.fadeClass()}>{strings.hobbies}</p>
          <h2 className={this.fadeClass()}>{strings.projects}</h2>
          <div className={this.fadeClass()}>
            <Project title="micro-mitten" href="https://github.com/doctorn/micro-mitten" link={strings.code!}>
              <p>{strings.micro}</p>
            </Project>
            <Project title="rust-lang/rust" href="https://github.com/rust-lang/rust" link={strings.code!}>
              <p>{strings.rust}</p>
            </Project>
            <Project title="mitten-lang/mitten" href="https://mitten-lang.org/" link={strings.website!}>
              <p>{strings.mitten}</p>
            </Project>
          </div>
          <h2 className={this.fadeClass()}>{strings.contact}</h2>
          <p className={this.fadeClass()}>
            {strings.formatString(strings.howto, <a href="mailto:me@nathancorbyn.com">me@nathancorbyn.com</a>)}
          </p>
          <p className="App-copyright">Copyright &copy; Nathan Corbyn 2020.</p>
        </div>
      </div>
    );
  }
}

export default App;
