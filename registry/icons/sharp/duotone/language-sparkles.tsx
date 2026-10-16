import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LanguageSparkles({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M15 11L19 11M11 15L23 15M14 15C14.4767 16.1439 15.5203 18.0076 17 19.543C18.1074 20.6922 19.459 21.6576 21 22L21.1071 22.0238M20 15C19.5234 16.1439 18.4797 18.0076 17 19.543C15.8926 20.6922 14.541 21.6576 13 22L12.8929 22.0238" strokeOpacity="0.4"/>
      <path d="M1.9138 11.1939L6 2L10.0862 11.1939M3.3333 8L8.6667 8"/>
      <path d="M5.5492 15.3739L6.4196 17.5804L8.6261 18.4508C8.8518 18.5397 9 18.7576 9 19C9 19.2424 8.8518 19.4603 8.6261 19.5492L6.4196 20.4196L5.5492 22.6261C5.4603 22.8518 5.2424 23 5 23C4.7576 23 4.5397 22.8518 4.4508 22.6261L3.5804 20.4196L1.3739 19.5492C1.1482 19.4603 1 19.2424 1 19C1 18.7576 1.1482 18.5397 1.3739 18.4508L3.5804 17.5804L4.4508 15.3739C4.5397 15.1482 4.7576 15 5 15C5.2424 15 5.4603 15.1482 5.5492 15.3739Z" fill="currentColor" stroke="none"/>
      <path d="M19.8433 2.2337L20.3873 3.6127L21.7663 4.1567C21.9074 4.2123 22 4.3485 22 4.5C22 4.6515 21.9074 4.7877 21.7663 4.8433L20.3873 5.3873L19.8433 6.7663C19.7877 6.9074 19.6515 7 19.5 7C19.3485 7 19.2123 6.9074 19.1567 6.7663L18.6127 5.3873L17.2337 4.8433C17.0926 4.7877 17 4.6515 17 4.5C17 4.3485 17.0926 4.2123 17.2337 4.1567L18.6127 3.6127L19.1567 2.2337C19.2123 2.0926 19.3485 2 19.5 2C19.6515 2 19.7877 2.0926 19.8433 2.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
