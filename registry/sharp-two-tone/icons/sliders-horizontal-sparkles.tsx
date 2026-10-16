import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SlidersHorizontalSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M1 6L12 6M1 13L9 13M21 13L12 13M21 20L13 20" strokeOpacity="0.4"/>
      <path d="M9 10L9 16M13 17L13 23"/>
      <path d="M19.5492 1.3739L20.4196 3.5804L22.6261 4.4508C22.8518 4.5397 23 4.7576 23 5C23 5.2424 22.8518 5.4603 22.6261 5.5492L20.4196 6.4196L19.5492 8.6261C19.4603 8.8518 19.2424 9 19 9C18.7576 9 18.5397 8.8518 18.4508 8.6261L17.5804 6.4196L15.3739 5.5492C15.1482 5.4603 15 5.2424 15 5C15 4.7576 15.1482 4.5397 15.3739 4.4508L17.5804 3.5804L18.4508 1.3739C18.5397 1.1482 18.7576 1 19 1C19.2424 1 19.4603 1.1482 19.5492 1.3739Z" fill="currentColor" stroke="none"/>
      <path d="M4.8433 17.2337L5.3873 18.6127L6.7663 19.1567C6.9074 19.2123 7 19.3485 7 19.5C7 19.6515 6.9074 19.7877 6.7663 19.8433L5.3873 20.3873L4.8433 21.7663C4.7877 21.9074 4.6515 22 4.5 22C4.3485 22 4.2123 21.9074 4.1567 21.7663L3.6127 20.3873L2.2337 19.8433C2.0926 19.7877 2 19.6515 2 19.5C2 19.3485 2.0926 19.2123 2.2337 19.1567L3.6127 18.6127L4.1567 17.2337C4.2123 17.0926 4.3485 17 4.5 17C4.6515 17 4.7877 17.0926 4.8433 17.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
