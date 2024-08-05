import type {MDXComponents} from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({children}) => <h1 className={'markdown'}>{children}</h1>,
    h2: ({children}) => <h2 className={'markdown'}>{children}</h2>,
    h3: ({children}) => <h3 className={'markdown'}>{children}</h3>,
    h4: ({children}) => <h4 className={'markdown'}>{children}</h4>,
    p: ({children}) => <p className={'markdown'}>{children}</p>,
    a: ({href, children}) => (
      <a className={'markdown'} href={href} target={'_blank'}>
        {children}
      </a>
    ),
    ul: ({children}) => <ul className={'markdown'}>{children}</ul>,
    img: ({src, alt, children}) => (
      <img className={'markdown'} src={src} alt={alt}>
        {children}
      </img>
    ),
    ...components
  };
}
