import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SendSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M11.6014 15.4362L10.369 13.631L2 7.9174L22 2L17.3501 17.7163M10.369 13.631L22 2"/>
      <path d="M5.5492 15.3739L6.4196 17.5804L8.6261 18.4508C8.8518 18.5397 9 18.7576 9 19C9 19.2424 8.8518 19.4603 8.6261 19.5492L6.4196 20.4196L5.5492 22.6261C5.4603 22.8518 5.2424 23 5 23C4.7576 23 4.5397 22.8518 4.4508 22.6261L3.5804 20.4196L1.3739 19.5492C1.1482 19.4603 1 19.2424 1 19C1 18.7576 1.1482 18.5397 1.3739 18.4508L3.5804 17.5804L4.4508 15.3739C4.5397 15.1482 4.7576 15 5 15C5.2424 15 5.4603 15.1482 5.5492 15.3739Z" fill="currentColor" stroke="none"/>
      <path d="M13.8433 18.2337L14.3873 19.6127L15.7663 20.1567C15.9074 20.2123 16 20.3485 16 20.5C16 20.6515 15.9074 20.7877 15.7663 20.8433L14.3873 21.3873L13.8433 22.7663C13.7877 22.9074 13.6515 23 13.5 23C13.3485 23 13.2123 22.9074 13.1567 22.7663L12.6127 21.3873L11.2337 20.8433C11.0926 20.7877 11 20.6515 11 20.5C11 20.3485 11.0926 20.2123 11.2337 20.1567L12.6127 19.6127L13.1567 18.2337C13.2123 18.0926 13.3485 18 13.5 18C13.6515 18 13.7877 18.0926 13.8433 18.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
