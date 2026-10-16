import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CursorSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M8.9737 8.9553L13.4001 22L16.4918 16.2705L22 13.6016L8.9737 8.9553Z"/>
      <path d="M5.5492 1.3739L6.4196 3.5804L8.6261 4.4508C8.8518 4.5397 9 4.7576 9 5C9 5.2424 8.8518 5.4603 8.6261 5.5492L6.4196 6.4196L5.5492 8.6261C5.4603 8.8518 5.2424 9 5 9C4.7576 9 4.5397 8.8518 4.4508 8.6261L3.5804 6.4196L1.3739 5.5492C1.1482 5.4603 1 5.2424 1 5C1 4.7576 1.1482 4.5397 1.3739 4.4508L3.5804 3.5804L4.4508 1.3739C4.5397 1.1482 4.7576 1 5 1C5.2424 1 5.4603 1.1482 5.5492 1.3739ZM13.8433 1.2337L14.3873 2.6127L15.7663 3.1567C15.9074 3.2123 16 3.3485 16 3.5C16 3.6515 15.9074 3.7877 15.7663 3.8433L14.3873 4.3873L13.8433 5.7663C13.7877 5.9074 13.6515 6 13.5 6C13.3485 6 13.2123 5.9074 13.1567 5.7663L12.6127 4.3873L11.2337 3.8433C11.0926 3.7877 11 3.6515 11 3.5C11 3.3485 11.0926 3.2123 11.2337 3.1567L12.6127 2.6127L13.1567 1.2337C13.2123 1.0926 13.3485 1 13.5 1C13.6515 1 13.7877 1.0926 13.8433 1.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
