import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MenuSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M3 7L12 7M3 13L21 13M11.9339 19L21 19"/>
      <path d="M18.5492 2.3739L19.4196 4.5804L21.6261 5.4508C21.8518 5.5397 22 5.7576 22 6C22 6.2424 21.8518 6.4603 21.6261 6.5492L19.4196 7.4196L18.5492 9.6261C18.4603 9.8518 18.2424 10 18 10C17.7576 10 17.5397 9.8518 17.4508 9.6261L16.5804 7.4196L14.3739 6.5492C14.1482 6.4603 14 6.2424 14 6C14 5.7576 14.1482 5.5397 14.3739 5.4508L16.5804 4.5804L17.4508 2.3739C17.5397 2.1482 17.7576 2 18 2C18.2424 2 18.4603 2.1482 18.5492 2.3739Z" fill="currentColor" stroke="none"/>
      <path d="M4.8433 17.2337L5.3873 18.6127L6.7663 19.1567C6.9074 19.2123 7 19.3485 7 19.5C7 19.6515 6.9074 19.7877 6.7663 19.8433L5.3873 20.3873L4.8433 21.7663C4.7877 21.9074 4.6515 22 4.5 22C4.3485 22 4.2123 21.9074 4.1567 21.7663L3.6127 20.3873L2.2337 19.8433C2.0926 19.7877 2 19.6515 2 19.5C2 19.3485 2.0926 19.2123 2.2337 19.1567L3.6127 18.6127L4.1567 17.2337C4.2123 17.0926 4.3485 17 4.5 17C4.6515 17 4.7877 17.0926 4.8433 17.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
