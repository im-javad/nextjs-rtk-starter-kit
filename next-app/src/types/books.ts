export interface CreateBook {
  title: string;
  author: string;
  published_year: number;
}

export interface UpdateBook {
  title: string;
  author: string;
  published_year: number;
}

// ______________________________________________________________________
export interface BookFetch {
  id: string;
  title: string;
  author: string;
  published_year: number;
  created_at: string;
}
export interface BooksFetchAll {
  data: BookFetch[];
}

export interface BookFetchById {
  data: {
    id: string;
    title: string;
    author: string;
    published_year: number;
    created_at: string;
  };
}
