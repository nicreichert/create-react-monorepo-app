import { Button } from '@monorepo/ui';
import Link from 'gatsby-link';
import * as React from 'react';
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

class App extends React.Component<IndexPageProps, {}> {
  public constructor(props: IndexPageProps, context: any) {
    super(props, context);
  }

  public render() {
    return (
      <div>
        <h1>Hi people</h1>
        <p>
          Welcome to your new <strong>{this.props.data.site.siteMetadata.title}</strong> site.
        </p>
        <p>Now go build something great.</p>
        <Button onClick={() => null} label={'Link button'}>
          <Link to="/page-2/">Go to page 2</Link>
        </Button>
      </div>
    );
  }
}

export default App;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
