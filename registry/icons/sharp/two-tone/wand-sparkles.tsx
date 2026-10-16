import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WandSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M17.4645 3L21 6.5355L6.5355 21L3 17.4645L17.4645 3ZM13.1251 7.3393L16.6607 10.8749"/>
      <path d="M6.5492 2.3739L7.4196 4.5804L9.6261 5.4508C9.8518 5.5397 10 5.7576 10 6C10 6.2424 9.8518 6.4603 9.6261 6.5492L7.4196 7.4196L6.5492 9.6261C6.4603 9.8518 6.2424 10 6 10C5.7576 10 5.5397 9.8518 5.4508 9.6261L4.5804 7.4196L2.3739 6.5492C2.1482 6.4603 2 6.2424 2 6C2 5.7576 2.1482 5.5397 2.3739 5.4508L4.5804 4.5804L5.4508 2.3739C5.5397 2.1482 5.7576 2 6 2C6.2424 2 6.4603 2.1482 6.5492 2.3739Z" fill="currentColor" stroke="none"/>
      <path d="M17.8433 15.2337L18.3873 16.6127L19.7663 17.1567C19.9074 17.2123 20 17.3485 20 17.5C20 17.6515 19.9074 17.7877 19.7663 17.8433L18.3873 18.3873L17.8433 19.7663C17.7877 19.9074 17.6515 20 17.5 20C17.3485 20 17.2123 19.9074 17.1567 19.7663L16.6127 18.3873L15.2337 17.8433C15.0926 17.7877 15 17.6515 15 17.5C15 17.3485 15.0926 17.2123 15.2337 17.1567L16.6127 16.6127L17.1567 15.2337C17.2123 15.0926 17.3485 15 17.5 15C17.6515 15 17.7877 15.0926 17.8433 15.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
