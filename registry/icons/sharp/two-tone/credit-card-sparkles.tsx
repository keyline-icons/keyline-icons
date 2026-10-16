import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CreditCardSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M22 10L22 9L22 4L2 4L2 20L12 20L13 20M1 9L2 9L22 9L23 9"/>
      <path d="M19.5492 13.3739L20.4196 15.5804L22.6261 16.4508C22.8518 16.5397 23 16.7576 23 17C23 17.2424 22.8518 17.4603 22.6261 17.5492L20.4196 18.4196L19.5492 20.6261C19.4603 20.8518 19.2424 21 19 21C18.7576 21 18.5397 20.8518 18.4508 20.6261L17.5804 18.4196L15.3739 17.5492C15.1482 17.4603 15 17.2424 15 17C15 16.7576 15.1482 16.5397 15.3739 16.4508L17.5804 15.5804L18.4508 13.3739C18.5397 13.1482 18.7576 13 19 13C19.2424 13 19.4603 13.1482 19.5492 13.3739Z" fill="currentColor" stroke="none"/>
      <path d="M11.8433 12.2337L12.3873 13.6127L13.7663 14.1567C13.9074 14.2123 14 14.3485 14 14.5C14 14.6515 13.9074 14.7877 13.7663 14.8433L12.3873 15.3873L11.8433 16.7663C11.7877 16.9074 11.6515 17 11.5 17C11.3485 17 11.2123 16.9074 11.1567 16.7663L10.6127 15.3873L9.2337 14.8433C9.0926 14.7877 9 14.6515 9 14.5C9 14.3485 9.0926 14.2123 9.2337 14.1567L10.6127 13.6127L11.1567 12.2337C11.2123 12.0926 11.3485 12 11.5 12C11.6515 12 11.7877 12.0926 11.8433 12.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
