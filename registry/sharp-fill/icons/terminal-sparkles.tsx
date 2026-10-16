import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TerminalSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M1.7191 4.7593L9.0001 11L1.6508 17.2993M19 19L10 19"/>
      <path d="M19.5492 4.3739L20.4196 6.5804L22.6261 7.4508C22.8518 7.5397 23 7.7576 23 8C23 8.2424 22.8518 8.4603 22.6261 8.5492L20.4196 9.4196L19.5492 11.6261C19.4603 11.8518 19.2424 12 19 12C18.7576 12 18.5397 11.8518 18.4508 11.6261L17.5804 9.4196L15.3739 8.5492C15.1482 8.4603 15 8.2424 15 8C15 7.7576 15.1482 7.5397 15.3739 7.4508L17.5804 6.5804L18.4508 4.3739C18.5397 4.1482 18.7576 4 19 4C19.2424 4 19.4603 4.1482 19.5492 4.3739ZM14.8433 11.2337L15.3873 12.6127L16.7663 13.1567C16.9074 13.2123 17 13.3485 17 13.5C17 13.6515 16.9074 13.7877 16.7663 13.8433L15.3873 14.3873L14.8433 15.7663C14.7877 15.9074 14.6515 16 14.5 16C14.3485 16 14.2123 15.9074 14.1567 15.7663L13.6127 14.3873L12.2337 13.8433C12.0926 13.7877 12 13.6515 12 13.5C12 13.3485 12.0926 13.2123 12.2337 13.1567L13.6127 12.6127L14.1567 11.2337C14.2123 11.0926 14.3485 11 14.5 11C14.6515 11 14.7877 11.0926 14.8433 11.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
