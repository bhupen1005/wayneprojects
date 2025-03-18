import MantineButtonComponent from "./Common/Button";

const ClaimActionButtons = ({ routePath }: { routePath: string }) => {
  const isClaimRoute = routePath === "/claim";
  const isEscalateRoute = routePath === "/claim/escalate";
  const isDeescalateRoute = routePath === "/claim/deescalate";
  const isReassignRoute = routePath === "/claim/reassign";
  const isEscalateDeescalateRoute = routePath === "/claim/escalate/deescalate";
  const isEscalateReassignRoute = routePath === "/claim/escalate/reassign";

  return (
    <div>
      <MantineButtonComponent
        mr={10}
        label="Escalate"
        disabled={
          isClaimRoute ||
          isEscalateRoute ||
          isEscalateDeescalateRoute ||
          isEscalateReassignRoute
        }
      />
      <MantineButtonComponent
        mr={10}
        label="Deescalate"
        disabled={
          isClaimRoute || isDeescalateRoute || isEscalateDeescalateRoute
        }
      />
      <MantineButtonComponent
        label="Reassign"
        disabled={isClaimRoute || isReassignRoute || isEscalateReassignRoute}
      />
    </div>
  );
};

export default ClaimActionButtons;
