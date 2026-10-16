import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SearchSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M14.9497 14.9497L21.2929 21.2929" strokeOpacity="0.4"/>
      <path d="M9 3L10 3C13.866 3 17 6.134 17 10C17 13.866 13.866 17 10 17C6.134 17 3 13.866 3 10L3 9"/>
      <path d="M10.5492 6.3739L11.4196 8.5804L13.6261 9.4508C13.8518 9.5397 14 9.7576 14 10C14 10.2424 13.8518 10.4603 13.6261 10.5492L11.4196 11.4196L10.5492 13.6261C10.4603 13.8518 10.2424 14 10 14C9.7576 14 9.5397 13.8518 9.4508 13.6261L8.5804 11.4196L6.3739 10.5492C6.1482 10.4603 6 10.2424 6 10C6 9.7576 6.1482 9.5397 6.3739 9.4508L8.5804 8.5804L9.4508 6.3739C9.5397 6.1482 9.7576 6 10 6C10.2424 6 10.4603 6.1482 10.5492 6.3739Z" fill="currentColor" stroke="none"/>
      <path d="M4.8433 2.2337L5.3873 3.6127L6.7663 4.1567C6.9074 4.2123 7 4.3485 7 4.5C7 4.6515 6.9074 4.7877 6.7663 4.8433L5.3873 5.3873L4.8433 6.7663C4.7877 6.9074 4.6515 7 4.5 7C4.3485 7 4.2123 6.9074 4.1567 6.7663L3.6127 5.3873L2.2337 4.8433C2.0926 4.7877 2 4.6515 2 4.5C2 4.3485 2.0926 4.2123 2.2337 4.1567L3.6127 3.6127L4.1567 2.2337C4.2123 2.0926 4.3485 2 4.5 2C4.6515 2 4.7877 2.0926 4.8433 2.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
