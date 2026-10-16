import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanTextSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M2 9L2 3L8 3M22 15L22 21L16 21M8 21L2 21L2 15M5 8L13 8M5 12L17 12"/>
      <path d="M19.5492 2.3739L20.4196 4.5804L22.6261 5.4508C22.8518 5.5397 23 5.7576 23 6C23 6.2424 22.8518 6.4603 22.6261 6.5492L20.4196 7.4196L19.5492 9.6261C19.4603 9.8518 19.2424 10 19 10C18.7576 10 18.5397 9.8518 18.4508 9.6261L17.5804 7.4196L15.3739 6.5492C15.1482 6.4603 15 6.2424 15 6C15 5.7576 15.1482 5.5397 15.3739 5.4508L17.5804 4.5804L18.4508 2.3739C18.5397 2.1482 18.7576 2 19 2C19.2424 2 19.4603 2.1482 19.5492 2.3739ZM11.8433 15.2337L12.3873 16.6127L13.7663 17.1567C13.9074 17.2123 14 17.3485 14 17.5C14 17.6515 13.9074 17.7877 13.7663 17.8433L12.3873 18.3873L11.8433 19.7663C11.7877 19.9074 11.6515 20 11.5 20C11.3485 20 11.2123 19.9074 11.1567 19.7663L10.6127 18.3873L9.2337 17.8433C9.0926 17.7877 9 17.6515 9 17.5C9 17.3485 9.0926 17.2123 9.2337 17.1567L10.6127 16.6127L11.1567 15.2337C11.2123 15.0926 11.3485 15 11.5 15C11.6515 15 11.7877 15.0926 11.8433 15.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
