import { PropsWithChildren, FormEventHandler } from "react";
import styled from "styled-components";

interface SearchFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const SearchFormForm = styled.form`
  table {
    width: 100%;
    border-radius: 6px;
    overflow: hidden;
    background-color: #fff;
    tbody {
      tr {
        border-bottom: 1px solid #f0f0f0;
        th,
        td {
          padding: 16px;
        }
        th {
          background-color: #fafafa;
        }
        td {
        }
      }
    }
  }
`;

const SearchForm: React.FC<PropsWithChildren<SearchFormProps>> = ({
  children,
  onSubmit,
}: any) => {
  return <SearchFormForm onSubmit={onSubmit}>{children}</SearchFormForm>;
};

export default SearchForm;
