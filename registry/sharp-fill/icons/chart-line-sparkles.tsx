import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartLineSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M3 8L3 22L22 22M6.7486 18.6286L9 13L19 12L21.0513 5.846"/>
      <path d="M8.5492 1.3739L9.4196 3.5804L11.6261 4.4508C11.8518 4.5397 12 4.7576 12 5C12 5.2424 11.8518 5.4603 11.6261 5.5492L9.4196 6.4196L8.5492 8.6261C8.4603 8.8518 8.2424 9 8 9C7.7576 9 7.5397 8.8518 7.4508 8.6261L6.5804 6.4196L4.3739 5.5492C4.1482 5.4603 4 5.2424 4 5C4 4.7576 4.1482 4.5397 4.3739 4.4508L6.5804 3.5804L7.4508 1.3739C7.5397 1.1482 7.7576 1 8 1C8.2424 1 8.4603 1.1482 8.5492 1.3739ZM16.8433 1.2337L17.3873 2.6127L18.7663 3.1567C18.9074 3.2123 19 3.3485 19 3.5C19 3.6515 18.9074 3.7877 18.7663 3.8433L17.3873 4.3873L16.8433 5.7663C16.7877 5.9074 16.6515 6 16.5 6C16.3485 6 16.2123 5.9074 16.1567 5.7663L15.6127 4.3873L14.2337 3.8433C14.0926 3.7877 14 3.6515 14 3.5C14 3.3485 14.0926 3.2123 14.2337 3.1567L15.6127 2.6127L16.1567 1.2337C16.2123 1.0926 16.3485 1 16.5 1C16.6515 1 16.7877 1.0926 16.8433 1.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
