import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Search2Sparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M16.6569 16.6569L21.2929 21.2929" strokeOpacity="0.4"/>
      <path d="M9.8019 3.0891C10.1927 3.0304 10.5928 3 11 3C15.4184 3 19 6.5816 19 11C19 15.4184 15.4184 19 11 19C6.5816 19 3 15.4184 3 11C3 10.5928 3.0304 10.1927 3.0891 9.8019"/>
      <path d="M11.5492 7.3739L12.4196 9.5804L14.6261 10.4508C14.8518 10.5397 15 10.7576 15 11C15 11.2424 14.8518 11.4603 14.6261 11.5492L12.4196 12.4196L11.5492 14.6261C11.4603 14.8518 11.2424 15 11 15C10.7576 15 10.5397 14.8518 10.4508 14.6261L9.5804 12.4196L7.3739 11.5492C7.1482 11.4603 7 11.2424 7 11C7 10.7576 7.1482 10.5397 7.3739 10.4508L9.5804 9.5804L10.4508 7.3739C10.5397 7.1482 10.7576 7 11 7C11.2424 7 11.4603 7.1482 11.5492 7.3739Z" fill="currentColor" stroke="none"/>
      <path d="M4.8433 2.2337L5.3873 3.6127L6.7663 4.1567C6.9074 4.2123 7 4.3485 7 4.5C7 4.6515 6.9074 4.7877 6.7663 4.8433L5.3873 5.3873L4.8433 6.7663C4.7877 6.9074 4.6515 7 4.5 7C4.3485 7 4.2123 6.9074 4.1567 6.7663L3.6127 5.3873L2.2337 4.8433C2.0926 4.7877 2 4.6515 2 4.5C2 4.3485 2.0926 4.2123 2.2337 4.1567L3.6127 3.6127L4.1567 2.2337C4.2123 2.0926 4.3485 2 4.5 2C4.6515 2 4.7877 2.0926 4.8433 2.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
