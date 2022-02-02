import styled from "styled-components/macro";
import { DeleteOutline } from "@material-ui/icons";
import MaterialTable from "material-table";
import useScore from "../../../hooks/useScore";
import "./index.scss";
import * as table from "../../../constants";

const DeleteIcon = styled(DeleteOutline)`
  color: red;
`;

const AdministrationScore = () => {
  const { scores, deleteScore } = useScore();

  return (
    <MaterialTable
      icons={table.TABLE_ICONS}
      title=""
      columns={[
        {
          title: "Name",
          field: "movie_title",
          align: "left",
          defaultGroupOrder: 0,
        },
        { title: "Score", field: "score" },
        { title: "Comment", field: "comment" },
        { title: "User", field: "user" },
        {
          title: "Created at",
          field: "create_date",
          type: "datetime",
        },
      ]}
      data={scores}
      options={{
        grouping: true,
        actionsColumnIndex: -1,
      }}
      actions={[
        {
          icon: DeleteIcon,
          iconProps: { color: "error" },
          tooltip: "Delete",
          onClick: (event, rowData) => {
            deleteScore(rowData.id);
          },
        },
      ]}
    />
  );
};

export default AdministrationScore;
