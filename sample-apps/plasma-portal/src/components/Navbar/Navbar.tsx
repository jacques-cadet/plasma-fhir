import { Navbar, UnstyledButton } from "@mantine/core";
import { Link } from "react-router-dom";

interface IAppNavbarProps { opened: boolean; }
function AppNavbar(props: IAppNavbarProps) {
    return (
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!props.opened} width={{ sm: 200, lg: 300 }}>
            <NavbarLink to="/patient"       title="Patient" />
            <NavbarLink to="/encounters"    title="Encounters" />
            <NavbarLink to="/allergies"     title="Allergies" />
            <NavbarLink to="/conditions"    title="Conditions" />
            <NavbarLink to="/familyHistory" title="Family History" />
            <NavbarLink to="/immunizations" title="Immunizations" />
            <NavbarLink to="/labs"          title="Labs" />
            <NavbarLink to="/vitals"        title="Vitals" />
        </Navbar>
    );
}

function NavbarLink(props: { title: string, to: string }) {
    const button = <UnstyledButton sx={(theme: any) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    })}>{props.title}</UnstyledButton>;

    // If there is no "to", then just return the button without a link...
    if (props.to === "") { return button; }

    return (
        <Link to={props.to} style={{textDecoration: "none"}}>
            {button}
        </Link>
    );
}

export default AppNavbar;